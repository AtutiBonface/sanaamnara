import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { AllpinsService } from '../../services/allpins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subject, Subscription, catchError } from 'rxjs';
import { CommonUtilsService } from '../../services/common-utils.service';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ToolbarComponent,
    TaswiraThemeDirective
  ],
  providers:[
    CommonUtilsService
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit , OnDestroy{


  post_liked: boolean = false
  comment_liked : boolean = false

  all_posts :Array<any> = []
  all_posts_subject :Subject<any> = new Subject<any>()
  post_clicked : any;

  follower_obj : any = []

  post_saved = false

  profile_name: string = ''

  timestamp :any = `?timestamp=${new Date().getTime()}`

  rootDirectory = '/assets/posts/'


  api_url = 'https://imaginekenya.site'

  


  

  

  current_id = this.activatedRoute.snapshot.params['id']
  

  constructor(
    private service: AllpinsService, 
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private utils: CommonUtilsService,
    private router: Router,
    private location: Location
    ){}

    moveBack() {
      this.location.back()
      
    }

    saveClickedPost(id: any){
      const data = 0
     this.http.put(`${this.utils.pinslist_url}/${id}`,data,  this.utils.returnHeaders()).pipe(
        catchError((err: HttpErrorResponse)=>{
          if(err){
            console.log(err.error)
          }
          return EMPTY
        })
      ).subscribe((e)=>{
        this.service.RequestAllPosts()
      })
      
    }

    
    clickedPostData(){
      this.service.RequestAllPosts()
    
      this.service.all_posts_subject.subscribe((result)=>{
      this.all_posts = result    

      this.post_clicked = this.all_posts.find(post => post.id === +this.current_id)


      this.post_saved = this.post_clicked?.saved

      

      
    })}

    

  getFollowersState(){
    let data = new FormData()
    data.append('post_id', this.current_id)
    this.http.post(this.utils.follow_url,data,  this.utils.returnHeaders()).subscribe((e)=>{
      this.follower_obj = e     
    })
  }

  FollowOrUnfollow(id : any){
    let data = new  FormData()

    data.append('follow_id', id)
    this.http.put(this.utils.follow_url, data, this.utils.returnHeaders()).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
        }
        return EMPTY
      })
    ).subscribe((e)=>{
      console.log(e)
    })
  }

  myProfileName(){
    this.utils.profile_subject.subscribe((res)=>{
      this.profile_name = res['username']
    })
  }


  navigateToProfile(username: any) {
    this.router.navigate([`${username}`])   
  }
 

  ngOnInit(): void {
    this.myProfileName()
    this.clickedPostData()   
    this.getFollowersState() 
  }

  ngOnDestroy(){
   
  }



}
