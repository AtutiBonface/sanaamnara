import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Subject, catchError } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-auto-complete',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers:[
    SearchService
  ],
  templateUrl: './search-auto-complete.component.html',
  styleUrl: './search-auto-complete.component.scss'
})
export class SearchAutoCompleteComponent{
  allSearchableData : any = []

  recently_serched_data : any = []

  popular_searches: any = []

  query :any;
  query_subject : Subject<any> = new Subject<any>()

  query_suggestions : any = []

  private search_url = 'http://localhost:8000/pins/search'
  private popular_searchs_url = 'http://localhost:8000/pins/popular-searches'
  private recently_searched_url = 'http://localhost:8000/pins/recent-searches'

  private token : string = ''

  constructor(private http:HttpClient , private service:SearchService){
    this.RequestAllSearchableData()
    this.RequestPopularSeachedData()
    this.RequestRecentlySearchedData()


   
  
  }
  ReturnHeader(){
    const is_server = typeof window === "undefined"
    if(!is_server){
      let tokenExists = localStorage.getItem('access_token')
      if(tokenExists){
        this.token = tokenExists
      }      

    }

    let headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`
    })

    return { headers }

  }

  RequestAllSearchableData(){
    this.http.get(this.search_url, this.ReturnHeader()).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      
      this.allSearchableData = result

      
     
    })

  }
  RequestRecentlySearchedData(){
    this.http.get(this.recently_searched_url, this.ReturnHeader()).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      
      this.recently_serched_data = result
     
    })

  }
  RequestPopularSeachedData(){
    this.http.get(this.popular_searchs_url, this.ReturnHeader()).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((result)=>{
      
      this.popular_searches = result
     
    })

  }



}
