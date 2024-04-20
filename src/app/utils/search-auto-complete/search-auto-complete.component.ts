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

  
  ngOnInit(): void {
    

    
  }

  ngOnDestroy(): void {
    

  }



}
