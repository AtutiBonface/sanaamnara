import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { EMPTY, Subject, catchError } from 'rxjs';
import { CommonUtilsService } from './common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AllpinsService{

  all_posts : any = []

  all_posts_subject : Subject<any> = new Subject<any>()


  private allposts_url = 'http://localhost:8000/pins/list'

  constructor(
    private http: HttpClient,
    private router: Router , 
    private utils: CommonUtilsService
    ){}


  RequestAllPosts(){
    this.http.get(this.allposts_url , this.utils.returnHeaders()).pipe(
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


}
