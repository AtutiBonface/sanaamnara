import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';
import { error } from 'node:console';
import { CommonUtilsService } from '../../services/common-utils.service';
import { AllpinsService } from '../../services/allpins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';

@Component({
  selector: 'app-myposts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProfileComponent,
    MatIconModule,
    SpinnerComponent,
    ToolbarComponent,
  ],
  providers:[
    CommonUtilsService,
    AllpinsService
  ],
  templateUrl: './myposts.component.html',
  styleUrl: '../savedposts/savedposts.component.scss'
})
export class MypostsComponent implements OnInit{


  private myposts_url = 'http://localhost:8000/pins/owner'
  private pinLisUrl = 'http://localhost:8000/pins/list'
  data : any = []
  current_user : boolean = false
  loading_complete : boolean = false
  no_of_post : number = 0
  timestamp = `?timestamp=${new Date().getTime()}`
  constructor(
    private http: HttpClient, 
    private utils: CommonUtilsService,
    private service: AllpinsService,
    private activatedRoute: ActivatedRoute,
    private router : Router
    ){}
  

  createdPinsList(){
    this.utils.all_profile_data_subject.subscribe(e=>{
      this.data = e

      
      this.current_user = this.data.current_user
      this.no_of_post = this.data.posts_no
      
      setTimeout(()=>{
        // sets loader to false
        this.loading_complete = true
      },500)
    })
  }

  saveActivatedRoute(){
    this.utils.activateRouteUsername = this.activatedRoute.snapshot.params['username']
  }

  deleteCreatedPost(id: any){
    const data = new FormData()
    let activatedUsername = this.activatedRoute.snapshot.params['username']
    data.append('username', activatedUsername)
    this.http.put(`${this.myposts_url}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err.error)
        }else{
          console.log('Second error ', err)
        }
        return EMPTY
      })
    ).subscribe((e)=>{
      this.data = e
      

     
    })
  }

  saveUserPost(id: any) {
    let data = 0
    this.http.put(`${this.pinLisUrl}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err: HttpErrorResponse)=>{
        
        return EMPTY
      })
    ).subscribe((e)=>{
       
      console.log(e)
       
    })
    
  }

  navigateTocreate() {
    this.router.navigate(['posts/create'])
  }


  ngOnInit(): void {
    this.saveActivatedRoute()
    this.utils.getProfileUser()
    this.createdPinsList()
  }

}
