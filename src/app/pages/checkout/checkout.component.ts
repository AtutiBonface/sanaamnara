import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { AllpinsService } from '../../services/allpins.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ToolbarComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  post_liked: boolean = false
  comment_liked : boolean = false

  all_posts :Array<any> = []
  all_posts_subject :Subject<any> = new Subject<any>()
  post_clicked : any;

  timestamp :any = `?timestamp=${new Date().getTime()}`

  

  current_id = this.activatedRoute.snapshot.params['id']

  constructor(private service: AllpinsService, private http: HttpClient, private activatedRoute: ActivatedRoute){

    console.log(this.timestamp)
  }


 

  ngOnInit(): void {
    this.service.RequestAllPosts()
    
    this.service.all_posts_subject.subscribe((result)=>{
      this.all_posts = result    

      this.post_clicked = this.all_posts.find(post => post.id === +this.current_id)

    })
  }



}
