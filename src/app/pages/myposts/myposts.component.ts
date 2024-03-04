import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';
import { error } from 'node:console';
import { CommonUtilsService } from '../../services/common-utils.service';
import { AllpinsService } from '../../services/allpins.service';
import { ActivatedRoute } from '@angular/router';
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
saveUserPost(arg0: any) {
throw new Error('Method not implemented.');
}
  private myposts_url = 'http://localhost:8000/pins/owner'
  data : any = []
  current_user : boolean = false
  loading_complete : boolean = false
  timestamp = `?timestamp=${new Date().getTime()}`
  constructor(
    private http: HttpClient, 
    private utils: CommonUtilsService,
    private service: AllpinsService,
    private activatedRoute: ActivatedRoute
    ){}
  

  createdPinsList(){
    this.utils.all_profile_data_subject.subscribe(e=>{
      this.data = e
      this.current_user = this.data.current_user
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
    const data = 0
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


  ngOnInit(): void {
    this.saveActivatedRoute()
    this.utils.getProfileUser()
    this.createdPinsList()
  }

}
