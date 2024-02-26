import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { EMPTY, Subject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllpinsService implements OnInit{

  all_posts : any = []

  all_posts_subject : Subject<any> = new Subject<any>()

  constructor(private http: HttpClient,private router: Router) { }


  RequestAllPosts(){
    const allposts_url = 'http://localhost:8000/pins/list'

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

    this.http.get(allposts_url, {headers}).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      this.all_posts_subject.next(result)
    })
  }



  ngOnInit(): void {
    
  }



}
