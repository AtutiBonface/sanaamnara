import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';
import { error } from 'node:console';
import { CommonUtilsService } from '../../services/common-utils.service';
import { AllpinsService } from '../../services/allpins.service';

@Component({
  selector: 'app-myposts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProfileComponent,
    MatIconModule,
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
  data : any = []
  timestamp = `?timestamp=${new Date().getTime()}`
  constructor(
    private http: HttpClient, 
    private utils: CommonUtilsService,
    private service: AllpinsService
    ){}
  

  createdPinsList(){
    this.http.get(this.myposts_url, this.utils.returnHeaders()).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      
      this.data = result
     
    })
  }

  deleteCreatedPost(id: any){
    const data = 0
    this.http.put(`${this.myposts_url}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((e)=>{
      this.data = e
    })
  }


  ngOnInit(): void {
    this.createdPinsList()
  }

}
