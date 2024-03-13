import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { CommonUtilsService } from '../../services/common-utils.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';

@Component({
  selector: 'app-savedposts',
  standalone: true,
  imports: [
    HttpClientModule,
    ProfileComponent,
    CommonModule,
    MatIconModule,
    SpinnerComponent,
    ToolbarComponent,
    TaswiraThemeDirective,
  ],
  providers:[
    CommonUtilsService
  ],
  templateUrl: './savedposts.component.html',
  styleUrl: './savedposts.component.scss'
})
export class SavedpostsComponent implements OnInit, OnDestroy{


theme: any;

  data : any = []
  timestamp = `?timestamp=${new Date().getTime()}`
  current_user: boolean = false
  loading_complete : boolean = false
  no_of_saved_posts : number = 0

  api_url = 'https://imaginekenya.site'

  
  constructor(
    private http: HttpClient, 
    private utils: CommonUtilsService,
    private activatedRoute : ActivatedRoute
  
    ){}

  savedPinsList(){
    this.utils.all_profile_data_subject.subscribe((e)=>{
      this.data = e
     
      this.current_user = this.data.current_user
      this.no_of_saved_posts = this.data.saved_no
     
      setTimeout(()=>{
        this.loading_complete = true
      },500)    
    })   
    
  } 

  returnActivatedUsername(){
    this.utils.activateRouteUsername = this.activatedRoute.snapshot.params['username']
  }

  deleteSavedPost(id: any){
    const data = new FormData()
    let activeUsername = this.activatedRoute.snapshot.params['username']
    data.append('username',activeUsername )
    this.http.put(`${this.utils.pin_saved_url}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err.error)
        }else{
          console.log('Second error', err.error)
        }
        return EMPTY
      })
    ).subscribe((e)=>{
      this.data = e  
    })

  }

  selectedTheme(theme: any) {
    this.theme = theme
   
  }
  openPopupMenu(arg0: any,arg1: any) {
  
  }
  navigateToCheckout(id: any) {
  
  }
    

  

  ngOnInit(): void {
    this.returnActivatedUsername()
    this.utils.getProfileUser()
    this.savedPinsList()
  }

  ngOnDestroy(): void {
   
  }
}




