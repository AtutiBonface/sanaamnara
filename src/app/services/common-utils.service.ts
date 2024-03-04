import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  private users_url = 'http://localhost:8000/accounts/users'

  profile_subject: Subject<any> = new Subject<any>()



  constructor(
    private http: HttpClient,
    
  ) { }

  returnHeaders(){
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

    return { headers }
  }




  ProfileName(){  
      this.http.get(this.users_url, this.returnHeaders()).pipe(
        catchError((err:HttpErrorResponse)=>{
          if(err){
            console.log(err.error)
          }
          return EMPTY
        })
      ).subscribe((result)=>{
        this.profile_subject.next(result)        
      })

    }

   
}
