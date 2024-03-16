import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  domain_url = 'https://api.imaginekenya.site'
  users_url = `${this.domain_url}/accounts/users`

  login_url = `${this.domain_url}/accounts/login/`

  register_url = `${this.domain_url}/accounts/register/`

  follow_url = `${this.domain_url}/accounts/follow`

  pinslist_url = `${this.domain_url}/pins/list`

  create_pin_url = `${this.domain_url}/pins/create`

  pin_owner_url = `${this.domain_url}/pins/owner`

  pin_saved_url = `${this.domain_url}/pins/saved`

  search_url = `${this.domain_url}/pins/search`

  profile_subject: Subject<any> = new Subject<any>()

  activateRouteUsername : string = ''

  all_profile_data_subject : Subject<any> = new Subject<any>()

  saved_successfully : Subject<any> = new Subject<any>()

  PinID_subject: Subject<any> = new Subject<any>()



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


  savePost(id: any){
    const data = 0
    this.http.put(`${this.pinslist_url}/${id}`,data, this.returnHeaders()).pipe(
      catchError((err: HttpErrorResponse)=>{
        
        return EMPTY
      })
    ).subscribe((e)=>{
      this.saved_successfully.next(e)
      
    })
  }



  ProfileName(){      
       
      this.http.get(this.users_url, this.returnHeaders()).pipe(
        catchError((err:any)=>{
          if(err instanceof HttpErrorResponse){
            
          }
          return EMPTY
        })
      ).subscribe((result)=>{
        this.profile_subject.next(result)        
      })

    }


  getProfileUser(){
    let data = new FormData()
    data.append('username', this.activateRouteUsername) 

    this.http.post(this.users_url,data, this.returnHeaders()).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          
        }else{
          
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      this.all_profile_data_subject.next(result)      
    })


  }

   
}
