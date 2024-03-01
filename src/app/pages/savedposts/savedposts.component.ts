import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-savedposts',
  standalone: true,
  imports: [
    HttpClientModule,
    ProfileComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './savedposts.component.html',
  styleUrl: './savedposts.component.scss'
})
export class SavedpostsComponent {
  private saved_posts_url = 'http://localhost:8000/pins/saved'
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

    this.http.get(this.saved_posts_url, {headers}).pipe(
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




