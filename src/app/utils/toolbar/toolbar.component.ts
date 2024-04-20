import { CommonModule } from '@angular/common';
import { Component,OnInit, Output} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchAutoCompleteComponent } from '../search-auto-complete/search-auto-complete.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject} from 'rxjs';
import { CommonUtilsService } from '../../services/common-utils.service';
import { MobileSearchComponent } from '../../pages/mobile-search/mobile-search.component';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SearchAutoCompleteComponent,
    MobileSearchComponent,
    TaswiraThemeDirective,
  ],
  providers: [
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent  implements OnInit{

  openSearchAutoComplete : boolean = false
  is_logged_in = false

  profile_username : any;
  profile_subject: Subject<any> = new Subject<any>()

  query :any;
  query_subject : Subject<any> = new Subject<any>()

  

  open_mobile_search_popup = false


  @Output() reloadPage : Subject<boolean> = new Subject<boolean>()

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private utils: CommonUtilsService){

    let token! :any;

    let is_server = typeof window === 'undefined'

    if(!is_server){
      this.profile_username = localStorage.getItem('user')
    }


    
  }



  
 
    
  
  dismissSearchContainer() {
    if(this.openSearchAutoComplete ){
      setTimeout(()=>{
        this.openSearchAutoComplete = false;
      }, 100)
    }
    else{

    }
  }   



  toggleOnAutoComplete(){
    if (this.openSearchAutoComplete === false){
      this.openSearchAutoComplete = true
    }else{
      this.openSearchAutoComplete = false
    }
  }
  

  navigateToCreate() {
    this.router.navigate(['posts/create'])
  }

  navigateToProfile() {
    if(this.profile_username!= undefined){
      this.router.navigate([this.profile_username])
    }

    console.log(this.profile_username)

    
  }
  navigateToHome() {
    this.open_mobile_search_popup = false
    this.router.navigate([''])  
    
    this.reloadPage.next(true)

  }
  
  
  navigateToMobileNotify() {
    this.open_mobile_search_popup = false
    
  }
  ngOnInit(): void {
   

  }


}
