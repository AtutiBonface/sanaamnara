import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchAutoCompleteComponent } from '../search-auto-complete/search-auto-complete.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Subject, catchError } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    SearchAutoCompleteComponent,
    ReactiveFormsModule,
  ],
  providers: [
    SearchService
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent  implements OnInit{



  openSearchAutoComplete : boolean = false
  is_logged_in = false
  private users_url = 'http://localhost:8000/accounts/users'

  profile_username : any;
  profile_subject: Subject<any> = new Subject<any>()


  searchData! : FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router,private service: SearchService){
    this.searchData = this.fb.group({
      query:[
        '',
      ]
    })
  }

 
    
  searchQuery() {
    this.searchData.get('query')?.valueChanges.subscribe((result)=>{
      this.service.getQuery(result)
    })

  }


  toggleOnAutoComplete(){
    this.openSearchAutoComplete = true
  }
  toggleOffAutoComplete(){
    setTimeout(()=>{
      this.openSearchAutoComplete = false
    },300)    
  }

  navigateToCreate() {
    this.router.navigate(['posts/create'])
  }

  navigateToProfile() {
    if(this.profile_username != undefined){
      this.router.navigate([this.profile_username])
    }

    
  }
  navigateToHome() {
    this.router.navigate([''])    
  }
  MyProfileName(){
    const is_server = typeof window === 'undefined'
    if (!is_server){
      let tokenExists = localStorage.getItem('access_token')
      if(tokenExists){
        let token = tokenExists
        const headers = new HttpHeaders({
          'Authorization': `Token ${token}`
        })
        this.http.get(this.users_url, { headers }).pipe(
          catchError((err:HttpErrorResponse)=>{
            if(err){
              console.log(err.error)
            }
            return EMPTY
          })
        ).subscribe((result)=>{
          this.profile_subject.next(result)          
        })

      }

    }
    this.profile_subject.subscribe((data)=>{
      this.profile_username = data['username']
    })

  }
  ngOnInit(): void {
    this.MyProfileName()
    this.searchQuery()
    
  }


}
