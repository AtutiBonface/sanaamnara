import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtilsService } from '../../services/common-utils.service';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    HttpClientModule,
    MatIconModule,
    SpinnerComponent,
    TaswiraThemeDirective
  ],
  providers:[
    CommonUtilsService,
    TaswiraThemeDirective
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {


  darkTheme : boolean = false

  activatedRouteParam : any;

  
  follower_obj: any = []

  profile_data :any = []

  current_user : boolean = false

  loading_complete : boolean = false

  pins_no : number = 0

  

  @Input()in_createdPage :boolean = true
  selectedTheme: any;

  @Output()Theme: EventEmitter<any> = new EventEmitter<any>()
 
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private utils: CommonUtilsService,
    private TaswiraTheme: TaswiraThemeDirective
    ){
    this.activatedRouteParam = this.activatedRoute.snapshot.params['username']
  }
    navigateEditProfile() {
      this.router.navigate(['profile/changes'])
    }
    

    navigateToSettings() {
      this.router.navigate(['my/_settings'])
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

    navigateToCreatePosts() {
      this.router.navigate(['posts/create'])
    }


    ngOnInit(): void {
      this.returnActivatedUser()
      this.utils.getProfileUser()
      this.receiveAllProfileData()
      
    }
    ngOnDestroy(): void {
      
    }


    toggleTheme() {
            
      const is_server = typeof window === 'undefined'
      if(!is_server){
        let theme = localStorage.getItem('theme')
        if(theme === 'light' || undefined){
          localStorage.setItem('theme', 'dark')
          this.darkTheme = true
          this.selectedTheme = 'dark'
          this.Theme.next('dark')
          
        }else{
          localStorage.setItem('theme', 'light')
          this.darkTheme = false
          this.selectedTheme = 'light'
          this.Theme.next('light')
        }
      }
    }
      
  

}
