import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY, Subject, Subscription, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse, provideHttpClient, withFetch } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
    HttpClientModule,
  ],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {



  processing_started : boolean = false

  processing_class_name : string = ''

  hide_password = true

  
  login_state_label: string = 'LOGIN'

 
  login_error: string = ''

  login_error_subject: Subject<any> = new Subject<any>()

  login_success_subject : Subject<any> = new Subject<any>()

  destroyLoginSubs! : Subscription;

  
  @Output() openDialog = new EventEmitter<boolean>() 

  @Output() openRegisterPage = new Subject<boolean>()

  @Output() is_logged_in = new Subject<boolean>()

  formData! : FormGroup;


  constructor(private fb: FormBuilder , private router: Router, private http: HttpClient){

    this.formData = this.fb.group({
      email: [
        '', 
        {validators : [Validators.required, Validators.email]}
    ],
      password:[
        '',
        {validators : [Validators.required]}
    ]

    })

  }
  


  togglePasswordVisibity() {
   this.hide_password = ! this.hide_password
  }


  navigateToRegister() {
    this.openRegisterPage.next(true)
    
  }

  closeLoginDialog() {
    this.openDialog.emit(false)
    
  }

  onFormSubmit(){
    this.processing_started  = true

    this.processing_class_name  = 'processing'


    this.login_state_label = 'signing in'

    this.login_error = ''




    const Data = new FormData()

    Data.append('email', this.formData.get('email')?.value)
    Data.append('password', this.formData.get('password')?.value)

    
    const api_url = 'http://localhost:8000/accounts/login/'


    this.http.post(api_url, Data).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          this.login_error_subject.next(err.error)

         
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      
      this.login_success_subject.next(result)
    })

  }


  ngOnInit(): void {

    this.destroyLoginSubs = this.login_error_subject.subscribe((result)=>{
      this.login_error = result['error']
      this.processing_started = false
      this.processing_class_name = ''
      this.login_state_label = 'Try again'

    })  
    
    this.destroyLoginSubs = this.login_success_subject.subscribe((result)=>{
      this.openDialog.emit(false)
      this.is_logged_in.next(true)
      this.router.navigate([''])

      const access_token = result['access_token']

      const ISSERVER = typeof window === "undefined";
      if(access_token && !ISSERVER){
    
        localStorage.setItem('access_token', access_token)
      
      }

      
      
    })
    
    
  }
  ngOnDestroy(): void {

    this.destroyLoginSubs.unsubscribe()
    
  }

}


