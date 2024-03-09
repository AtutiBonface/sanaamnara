import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterComponent } from '../../accounts/register/register.component';
import { LoginComponent } from '../../accounts/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticatedUsersService } from '../../services/authenticated-users.service';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [
    CommonModule,
    RegisterComponent,
    LoginComponent,
    MatToolbarModule,
    MatIconModule,
    
    
  ],
  templateUrl: './unauthenticated.component.html',
  styleUrl: './unauthenticated.component.scss'
})
export class UnauthenticatedComponent {

  

  constructor(
    private service: AuthenticatedUsersService
  ){

    

  }  
  
  
  openloginDialog : boolean = false
  openRegisterDialog : boolean = false


  toggleRegisterDialog() {
    if (this.openloginDialog){
      this.openloginDialog = false
      this.openRegisterDialog = true
    }else{
      this.openRegisterDialog = true
    }
    
  }
    toggleLoginDialog() {
      if (this.openRegisterDialog){
        this.openRegisterDialog = false
        this.openloginDialog = true
      }else{
        this.openloginDialog = true
      }
    
  }
  closeLogin($event: boolean) {

    this.openloginDialog = $event
    
  }
  closeRegister($event: boolean) {

    this.openRegisterDialog = $event
    
  }


  confirmLoggedIn($event: boolean) {
   
  }

  
  


}
