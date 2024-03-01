import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { 
    
  }

  query_subject: EventEmitter<any> = new EventEmitter<any>()


  getQuery(query : any){
    this.query_subject.emit(query)  
    
  }

}
