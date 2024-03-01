import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { 
    
  }

  query_subject: Subject<any> = new Subject<any>()


  getQuery(query : any){
    this.query_subject.next(query)
  }

}
