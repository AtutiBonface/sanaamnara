import { CommonModule, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, provideHttpClient, withFetch } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from '../../accounts/register/register.component';
import { LoginComponent } from '../../accounts/login/login.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchAutoCompleteComponent } from '../../utils/search-auto-complete/search-auto-complete.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { Router } from '@angular/router';
import { EMPTY, Subject, catchError, timestamp } from 'rxjs';
import { AllpinsService } from '../../services/allpins.service';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { CommonUtilsService } from '../../services/common-utils.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,    
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,  
    ToolbarComponent,  
    SpinnerComponent,
    
  ],
  providers:[
   CommonUtilsService,
   AllpinsService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private pinLisUrl = 'http://localhost:8000/pins/list'

  pins_list : any = []

  timestamp : string = `?timestamp=${new Date().getTime()}`

  loading : boolean = true

  saved : boolean = false

  connection_failed : boolean = false

  saved_text = 'saved'



  constructor(
    private service: AllpinsService,
    private router :Router, 
    private http: HttpClient, 
    private utils: CommonUtilsService
    ){}


  allWebsitePosts(){
    this.service.RequestAllPosts()
    this.service.all_posts_subject.subscribe((result)=>{
      this.pins_list = result
      setTimeout(()=>{
        this.loading = false
      },500)

            
    })


  }
  checkConnection(){
    this.utils.getProfileUser()
    this.service.error_subject.subscribe((e)=>{
      
      this.connection_failed = true
    })
  }

  
  
  
  savePostToMyProfile(id: any){
    const data = 0
    this.http.put(`${this.pinLisUrl}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          this.saved_text = 'Already'          
        }
        this.saved_text = 'Already'
        return EMPTY
      })
    ).subscribe((e)=>{

      this.saved = true
      this.saved_text = 'saved'

      setTimeout(()=>{
        this.saved = false

      },500)
      
    })
  }


  // when a post is clicked it navigates to individual page aka checkout
  navigateToCheckout(id :any){    
    this.router.navigate([`posts/${id}`])
    
  }


  ngOnInit(): void {
    this.allWebsitePosts()
    this.checkConnection()
    
  }
  
  
}
