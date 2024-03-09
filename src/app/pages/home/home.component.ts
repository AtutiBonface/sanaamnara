import { CommonModule} from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { Router } from '@angular/router';
import { EMPTY, catchError,} from 'rxjs';
import { AllpinsService } from '../../services/allpins.service';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { CommonUtilsService } from '../../services/common-utils.service';
import { MobileSearchComponent } from '../mobile-search/mobile-search.component';
import { PopupComponent } from '../../utils/popup/popup.component';
import { LazyLoadImagesModule } from 'ngx-lazyload-image';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,    
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,  
    ToolbarComponent,  
    SpinnerComponent,
    MobileSearchComponent,
    PopupComponent,
    
        
  ],
  providers:[
   CommonUtilsService,
   AllpinsService,
   

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{



  private pinLisUrl = 'http://localhost:8000/pins/list'

  pins_list : any = []

  timestamp : string = `?timestamp=${new Date().getTime()}`

  open_popup : boolean = false

  loading : boolean = false

  saved : boolean = false

  connection_failed : boolean = false

  
 


  constructor(
    private service: AllpinsService,
    private router :Router, 
    private http: HttpClient, 
    private utils: CommonUtilsService,
    
    ){
      this.allWebsitePosts()
    }

    


  allWebsitePosts(){
    this.service.RequestAllPosts()
    this.service.all_posts_subject.subscribe((result)=>{
      this.pins_list = result 
      setTimeout(() =>{
        this.loading = false
      },500)    
            
    })


  }
  checkConnection(){
    this.utils.getProfileUser()
    this.service.error_subject.subscribe((e)=>{      
      this.connection_failed = true
      this.loading = false
      
    })
  }

  
  
  
  savePostToMyProfile(id: any){
    const data = 0
    this.http.put(`${this.pinLisUrl}/${id}`,data, this.utils.returnHeaders()).pipe(
      catchError((err: HttpErrorResponse)=>{
        
        return EMPTY
      })
    ).subscribe((e)=>{
      this.allWebsitePosts()     
     
      
    })
  }

  closeMorePopup(e: any){
    this.open_popup = false
  }

  // when a post is clicked it navigates to individual page aka checkout
  navigateToCheckout(id :any){    
    this.router.navigate([`posts/${id}`])
    
  }

  openPopupMenu(id: any) {
    this.open_popup = true
    
  }


  ngOnInit(): void {
    
    this.checkConnection()
    
  }

  ngOnDestroy(): void {
    
    
  }
  
  
}
