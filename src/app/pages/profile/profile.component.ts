import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtilsService } from '../../services/common-utils.service';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    HttpClientModule,
    MatIconModule,
    SpinnerComponent,
  ],
  providers:[
    CommonUtilsService
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  activatedRouteParam : any;

  private follow_url = 'http://localhost:8000/accounts/follow'
  follower_obj: any = []

  profile_data :any = []

  current_user : boolean = false

  loading_complete : boolean = false

  pins_no : number = 0

  

  @Input()in_createdPage :boolean = true
 
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private utils: CommonUtilsService,
    ){
    this.activatedRouteParam = this.activatedRoute.snapshot.params['username']
  }


  

    navigateToSavedPosts() {
      this.router.navigate([`${this.activatedRouteParam}/saved`])
      
    }
    navigateToMyPosts() {
      this.router.navigate([`${this.activatedRouteParam}/posts`])
    
    }

   

    receiveAllProfileData(){
      this.utils.all_profile_data_subject.subscribe((e)=>{
        setTimeout(()=>{
          this.loading_complete = true
        },1000)

        this.profile_data = e
        
        this.current_user = this.profile_data['current_user']
      })
    }


    returnActivatedUser(){
      this.utils.activateRouteUsername = this.activatedRoute.snapshot.params['username']
    }


    ngOnInit(): void {
      this.returnActivatedUser()
      this.utils.getProfileUser()
      this.receiveAllProfileData()
      
    }
    ngOnDestroy(): void {
      
    }
  

}
