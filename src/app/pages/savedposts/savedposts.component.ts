import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';
import { CommonUtilsService } from '../../services/common-utils.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';

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
  ],
  providers:[
    CommonUtilsService
  ],
  templateUrl: './savedposts.component.html',
  styleUrl: './savedposts.component.scss'
})
export class SavedpostsComponent implements OnInit{
saveUserPost(arg0: any) {
throw new Error('Method not implemented.');
}
  private saved_posts_url = 'http://localhost:8000/pins/saved'
  data : any = []
  timestamp = `?timestamp=${new Date().getTime()}`
  current_user: boolean = false
  loading_complete : boolean = false
  constructor(
    private http: HttpClient, 
    private utils: CommonUtilsService,
    private activatedRoute : ActivatedRoute
  
    ){}

  savedPinsList(){
    this.utils.all_profile_data_subject.subscribe((e)=>{
      this.data = e
     
      this.current_user = this.data.current_user
      setTimeout(()=>{
        this.loading_complete = true
      },500)    
    })   
    
  } 

  returnActivatedUsername(){
    this.utils.activateRouteUsername = this.activatedRoute.snapshot.params['username']
  }

  deleteSavedPost(id: any){
    const data = 0
    this.http.put(`${this.saved_posts_url}/${id}`,data, this.utils.returnHeaders()).pipe(
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

  ngOnInit(): void {
    this.returnActivatedUsername()
    this.utils.getProfileUser()
    this.savedPinsList()
  }
}




