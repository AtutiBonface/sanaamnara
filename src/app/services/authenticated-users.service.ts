import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUsersService {

  is_authenticated : Subject<boolean> = new Subject<boolean>()

  


  isAuthenticated(){
    let token: any;

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      token = localStorage.getItem('access_token')
      if(token){
        return true
      }
      return false
      
    }return false

   

    
  }
}
