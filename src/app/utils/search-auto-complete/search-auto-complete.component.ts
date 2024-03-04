import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Subject, catchError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-auto-complete',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
  ],
  templateUrl: './search-auto-complete.component.html',
  styleUrl: './search-auto-complete.component.scss'
})
export class SearchAutoCompleteComponent implements OnInit{

  allSearchableData : any = []

  recently_serched_data : any = []

  popular_searches: any = []

  showOtherSuggestions : boolean = true

  @Input() query :any;
  query_subject : Subject<any> = new Subject<any>()

  query_suggestions : any = []

  private search_url = 'http://localhost:8000/pins/search'
  private popular_searchs_url = 'http://localhost:8000/pins/popular-searches'
  private recently_searched_url = 'http://localhost:8000/pins/recent-searches'

  private token : string = ''

  constructor(private http:HttpClient , private router: Router){
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

  searchSuggestions(e: any){
    const filteredData = this.allSearchableData.filter((item: any) =>item.title.toLowerCase().includes(e.toLowerCase()))
    
    

    this.query_suggestions = filteredData
  }
  
  searchedData(){
    this.query.subscribe((e: any)=>{
      
      this.searchSuggestions(e)
      if(e === ''){
        this.query_suggestions = []
        this.showOtherSuggestions = true
      }else{
        this.showOtherSuggestions = false
      }
    })

    
  }
  navigateToSearchResult() {
    this.router.navigate(['create'])
  }
  ngOnInit(): void {
    this.searchedData()

    
  }



}
