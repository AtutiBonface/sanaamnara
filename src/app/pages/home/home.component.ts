import { CommonModule, isPlatformBrowser} from '@angular/common';
import { Component, OnDestroy, OnInit,  ElementRef,ViewChild, AfterViewInit, Inject, PLATFORM_ID, Renderer2, Directive } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { Router } from '@angular/router';
import { AllpinsService } from '../../services/allpins.service';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { CommonUtilsService } from '../../services/common-utils.service';
import { MobileSearchComponent } from '../mobile-search/mobile-search.component';
import { PopupComponent } from '../../utils/popup/popup.component';
import { TawiraMasonryDirective } from '../../directives/tawira-masonry.directive';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';
import { PinIntersectionDirective } from '../../directives/pin-intersection.directive';
import { DimensionsDirective } from '../../directives/dimensions.directives';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,    
    MatIconModule,
    MatToolbarModule,
    ToolbarComponent,  
    SpinnerComponent,
    MobileSearchComponent,
    PopupComponent,
    TaswiraThemeDirective,
    PinIntersectionDirective,
    DimensionsDirective,
    
  ],
  providers:[
   CommonUtilsService,
   AllpinsService,
   

  ],
  

  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  
  
  
  copiedLink: any = false
  shareMenuOpened: any = false
  actionMenuOpened: any = false



  pins_list : any = []

  timestamp : string = `?timestamp=${new Date().getTime()}`

  open_popup : boolean = false

  loading : boolean = false

  saved : boolean = false

  connection_failed : boolean = false

  newImageClassName = 'none'

  


  IdForpopup : any = ''

  image_url = ''


  api_url = 'https://imaginekenya.site'

  placeholderSrc = 'assets/Taswira2030.png';


 
  constructor(
    private service: AllpinsService,
    private router :Router, 
    private utils: CommonUtilsService,
    
    ){
    }

    calculateHeight(height: number,width: number, orignal_width: number) {
      const newHeight = (height/width)*orignal_width

      
      
      return newHeight
    }


    openSeeMoreMenu(id: any) {
      this.actionMenuOpened = true
      this.IdForpopup = id
    }
    openShareMenu(id : any, image: string) {
      this.IdForpopup = id
      this.actionMenuOpened = true;
      this.shareMenuOpened = true
      this.image_url = image
    
    }
    copyToClipboard() {
      this.copiedLink = true
    
    }


    closeActions() {
      this.actionMenuOpened = false;
      this.shareMenuOpened = false;
      this.copiedLink = false;
   }

    imageLoaded(){
      this.newImageClassName = 'block'
    }


    reloadPage($event: boolean) {
      this.service.RequestAllPosts()
      this.checkConnection()
    }

    


  allWebsitePosts(){
    
    this.service.all_posts_subject.subscribe((result)=>{
      this.pins_list = result
      
      
      
      setTimeout(()=>{
        this.loading = false
      },200)
                  
    })


  }
  checkConnection(){
    this.service.error_subject.subscribe((e)=>{      
      this.connection_failed = true
      this.loading = false
      
    })
  }

  
  
  // saves the post
  savePostToMyProfile(id: any){
    this.utils.savePost(id)
  }

  closeMorePopup(e: any){
    this.open_popup = false
  }

  // when a post is clicked it navigates to individual page aka checkout
  navigateToCheckout(id :any){    
    this.router.navigate([`posts/${id}`])
    
  }

  openPopupMenu(id: any, image: string) {
    this.open_popup = true
    this.IdForpopup = id

    this.image_url = image

    
  }


  ngOnInit(): void {
    this.service.RequestAllPosts()    
    this.checkConnection()
    this.allWebsitePosts()

    

    
  }

  ngOnDestroy(): void {

    
    
    
  }
  
  
}

