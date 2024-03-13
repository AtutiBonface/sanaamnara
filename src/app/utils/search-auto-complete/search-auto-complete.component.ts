import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { Component,Input, OnDestroy, OnInit, } from '@angular/core';
import { EMPTY, Subject, Subscription, catchError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { Router } from '@angular/router';
import { CommonUtilsService } from '../../services/common-utils.service';

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
export class SearchAutoCompleteComponent implements OnInit, OnDestroy{

  allSearchableData : any = []

  recently_serched_data : any = []

  popular_searches: any = []

  showOtherSuggestions : boolean = true

  @Input() query :any;
  query_subject : Subject<any> = new Subject<any>()

  query_suggestions : any = []

  
  private token : string = ''

  subscribed! : Subscription
  subscribed2! : Subscription
  subscribed3! : Subscription

  constructor(
    private http:HttpClient , 
    private router: Router,
    private utils: CommonUtilsService
    ){
    
  
  }
 

  

  RequestAllSearchableData(){
    this.subscribed = this.http.get(this.utils.search_url, this.utils.returnHeaders()).pipe(
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
    this.RequestAllSearchableData()
    this.searchedData()

    
  }

  ngOnDestroy(): void {
    this.subscribed.unsubscribe()
    this.subscribed2.unsubscribe()
    this.subscribed3.unsubscribe()

  }



}
