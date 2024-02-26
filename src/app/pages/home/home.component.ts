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



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SearchAutoCompleteComponent,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,  
    ToolbarComponent,  
    
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

  pin_list_subject : Subject<any> = new Subject<any>()
  constructor(private service: AllpinsService, private router :Router){

    const Url_time = new Date().getTime()

    this.timestamp = `?timestamp=${Url_time}`
    
  }


  ngOnInit(): void {
    this.service.RequestAllPosts()
    this.service.all_posts_subject.subscribe((result)=>{
      this.pins_list = result

    })
  }
  onScroll($event: Event) {
 
  }
  navigateToCheckout(id :any){

    console.log(id)
    this.router.navigate([`posts/${id}`])
    
  }
  
  
}
