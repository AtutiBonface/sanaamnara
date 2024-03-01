import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { EMPTY, Subject, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    HttpClientModule,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  activatedRouteParam : any;

 
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute){
    this.activatedRouteParam = this.activatedRoute.snapshot.params['username']
  }


  

    navigateToSavedPosts() {
      this.router.navigate([`${this.activatedRouteParam}/saved`])
      
    }
    navigateToMyPosts() {
      this.router.navigate([`${this.activatedRouteParam}/posts`])
    
    }



    ngOnInit(): void {
      
    }
  

}
