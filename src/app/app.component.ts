import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './pages/index/index.component';
import { SearchAutoCompleteComponent } from './utils/search-auto-complete/search-auto-complete.component';
import { AuthenticatedUsersService } from './services/authenticated-users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    RegisterComponent,
    ReactiveFormsModule,
    LoginComponent,
    CommonModule,
    SpinnerComponent,
    MatIconModule,
    SearchAutoCompleteComponent,
    HttpClientModule,
    IndexComponent,
  ],
  providers:[
    AuthenticatedUsersService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{

  

  ngOnInit(): void {
   
    
  }
  
  
}
