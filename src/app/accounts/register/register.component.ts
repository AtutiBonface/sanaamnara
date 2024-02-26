import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { EMPTY, Subject, Subscription, catchError } from 'rxjs';
import {MatIconModule} from '@angular/material/icon'
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy{




  @Output() openRegister = new Subject<boolean>()
  @Output() navigateToLogin = new Subject<boolean>()


  processing_class_name: string = ''
  reg_state_label: string = 'REGISTER'
  processing_started: boolean = false;

  destroySubsOnclose! : Subscription;

  hide_password = true
  hide_password2 = true
  registering_error: string = ''
  registering_error_subject : Subject<any> = new Subject<any>()

  registering_success : Subject<any> = new Subject<any>()
  
  formData!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.formData = this.fb.group({
      email:[
        '',
        {validators: [Validators.required, Validators.email]}
      ],

      username:[
        '',
        {validators:[Validators.required]}
      ],

      password:[
        '',
        {
          validators :[Validators.required, Validators.minLength(7)],
          updateOn: 'change'
        }
      ],
      repeat_password: [
        '',
        {
          validators: [Validators.required, this.PassMissMatch()],
          updateOn: 'change'
        
        },

        
      ]

    })


  }
  

  closeRegisterDialog() {
    this.openRegister.next(false)
  }
  navigateToLoginPage() {
    this.navigateToLogin.next(true)
  }
  
  onFormSubmit(){
    // while the data is being processed
    this.processing_started  = true

    this.processing_class_name  = 'processing'


    this.reg_state_label = 'signing up'

    this.registering_error = ''


    const Data = new FormData()

    Data.append('email', this.formData.get('email')?.value)
    Data.append('username', this.formData.get('username')?.value)
    Data.append('password', this.formData.get('password')?.value)

    



    const api_url = 'http://localhost:8000/accounts/register/'


    console.log(this.formData.get('password')?.value)

    this.http.post(api_url, Data).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          this.registering_error_subject.next(err.error)
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      
      this.navigateToLogin.next(true)      
    })
   

  }


  getConfirmPassword(){
    const password = this.formData?.get('repeat_password')?.value
    return password
  }
  
  PassMissMatch():ValidatorFn{


    return (control: AbstractControl): ValidationErrors|null =>{

      const initial_password  = control.value
     

      
      if (this.getConfirmPassword() === initial_password){

        return  null
        
      }
      else{
        return  {passMissMatch : true}
      }

    }
  }

  ngOnDestroy(): void {
    this.destroySubsOnclose.unsubscribe()
    
  }
  ngOnInit(): void {

    this.destroySubsOnclose =  this.registering_error_subject.subscribe((result)=>{
     setTimeout(()=>{
      this.registering_error = result['error']
      this.processing_started = false
      this.processing_class_name = ''
      this.reg_state_label = 'Try again'
     },1000)
    })

    
    
  }


}
