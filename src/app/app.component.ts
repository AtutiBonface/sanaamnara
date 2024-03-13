import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticatedUsersService } from './services/authenticated-users.service';
import { UnauthenticatedComponent } from './pages/unauthenticated/unauthenticated.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    
    CommonModule,
    SpinnerComponent,
    
    HttpClientModule,
    UnauthenticatedComponent,
  ],
  providers:[
    AuthenticatedUsersService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{

  loading: boolean = true

  constructor(private service : AuthenticatedUsersService){}

  ngOnInit(): void {

    setTimeout(()=>{
      this.loading = false
    },1000) 
  }
  
  
}
