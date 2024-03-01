import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-myposts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProfileComponent,
    MatIconModule,
  ],
  templateUrl: './myposts.component.html',
  styleUrl: '../savedposts/savedposts.component.scss'
})
export class MypostsComponent {
  private myposts_url = 'http://localhost:8000/pins/owner'
  data : any = []
  timestamp = `?timestamp=${new Date().getTime()}`
  constructor(private http: HttpClient){
    
    let token : any;
    const is_server = typeof window === "undefined"
    if(!is_server){
      let tokenExists = localStorage.getItem('access_token')
      if(tokenExists){
        token = tokenExists
      }      

    }

    let headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    })

    this.http.get(this.myposts_url, {headers}).pipe(
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

}
