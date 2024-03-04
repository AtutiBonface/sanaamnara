import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';
import { CommonUtilsService } from '../../services/common-utils.service';

@Component({
  selector: 'app-savedposts',
  standalone: true,
  imports: [
    HttpClientModule,
    ProfileComponent,
    CommonModule,
    MatIconModule,
  ],
  providers:[
    CommonUtilsService
  ],
  templateUrl: './savedposts.component.html',
  styleUrl: './savedposts.component.scss'
})
export class SavedpostsComponent implements OnInit{
  private saved_posts_url = 'http://localhost:8000/pins/saved'
  data : any = []
  timestamp = `?timestamp=${new Date().getTime()}`
  constructor(private http: HttpClient, private utils: CommonUtilsService){}

  savedPinsList(){
    this.http.get(this.saved_posts_url, this.utils.returnHeaders()).pipe(
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

  

  deleteSavedPost(id: any){
    const data = 0
    this.http.put(`${this.saved_posts_url}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err){
          console.log(err)
        }
        return EMPTY
      })
    ).subscribe((e)=>{
      this.data = e
    })

  }

  ngOnInit(): void {
    this.savedPinsList()
  }
}




