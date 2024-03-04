import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { EMPTY, Subject, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtilsService } from '../../services/common-utils.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    HttpClientModule,
    MatIconModule,
  ],
  providers:[
    CommonUtilsService
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  activatedRouteParam : any;

  private follow_url = 'http://localhost:8000/accounts/follow'
  follower_obj: any = []


 
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private utils: CommonUtilsService,
    ){
    this.activatedRouteParam = this.activatedRoute.snapshot.params['username']
  }


  

    navigateToSavedPosts() {
      this.router.navigate([`${this.activatedRouteParam}/saved`])
      
    }
    navigateToMyPosts() {
      this.router.navigate([`${this.activatedRouteParam}/posts`])
    
    }

    getFollowersState(){
      this.http.get(this.follow_url,  this.utils.returnHeaders()).subscribe((e)=>{
        this.follower_obj = e     
      })
    }

    ngOnInit(): void {
      this.getFollowersState()
      
    }
  

}
