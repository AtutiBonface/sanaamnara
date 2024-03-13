import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject, catchError } from 'rxjs';
import { CommonUtilsService } from './common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUsersService {

  is_authenticated : Subject<boolean> = new Subject<boolean>()




  constructor(private http: HttpClient, private utils: CommonUtilsService){

  }

  



  isAuthenticated(){
    let token: any;

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      token = localStorage.getItem('access_token')
      if(token){  
        
        this.is_authenticated.next(true)
        return true

      }
      this.is_authenticated.next(true)
      return false      
      
    }return false
    
  }

  
}
