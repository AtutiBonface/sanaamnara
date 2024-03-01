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
   
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  pinLisUrl = 'http://localhost:8000/pins/list'

  pins_list : any = []

  timestamp : string = ''

  loading : boolean = true

  pin_list_subject : Subject<any> = new Subject<any>()
  constructor(private service: AllpinsService, private router :Router){

    const Url_time = new Date().getTime()

    this.timestamp = `?timestamp=${Url_time}`
    
  }


  ngOnInit(): void {
    this.service.RequestAllPosts()
    this.service.all_posts_subject.subscribe((result)=>{
      this.pins_list = result
      setTimeout(()=>{
        this.loading = false
      },1000)
     


    })
  }
  onScroll($event: Event) {
 
  }
  navigateToCheckout(id :any){

    
    this.router.navigate([`posts/${id}`])
    
  }
  
  
}
