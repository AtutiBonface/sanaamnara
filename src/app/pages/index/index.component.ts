import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { UnauthenticatedComponent } from '../unauthenticated/unauthenticated.component';
import { AuthenticatedUsersService } from '../../services/authenticated-users.service';
import { CommonModule } from '@angular/common';
import { canActivateTeam } from '../../services/authguard';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HomeComponent,
    UnauthenticatedComponent,
    CommonModule,
  ],
  templateUrl: './index.component.html',
  
})
export class IndexComponent implements OnInit{

  authenticationChecked: boolean = false

  constructor(
    private auth: AuthenticatedUsersService,
    
  ){

  }

  userLoggedIn : any = true


  ngOnInit(): void {

   
    

    setTimeout(()=>{     

      this.authenticationChecked = true
    }, 2000)
    
    
  }
}
