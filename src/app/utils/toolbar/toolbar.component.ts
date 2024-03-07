import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchAutoCompleteComponent } from '../search-auto-complete/search-auto-complete.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject} from 'rxjs';
import { CommonUtilsService } from '../../services/common-utils.service';
import { MobileSearchComponent } from '../../pages/mobile-search/mobile-search.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SearchAutoCompleteComponent,
    MobileSearchComponent
  ],
  providers: [
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent  implements OnInit{





  openSearchAutoComplete : boolean = false
  is_logged_in = false
  private users_url = 'http://localhost:8000/accounts/users'

  profile_username : any;
  profile_subject: Subject<any> = new Subject<any>()

  query :any;
  query_subject : Subject<any> = new Subject<any>()

  searchData! : FormGroup;

  open_mobile_search_popup = false

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private utils: CommonUtilsService){
    this.searchData = this.fb.group({
      query:[
        '',
      ]
    })
  }

 
    
  searchQuery() {
    this.searchData.get('query')?.valueChanges.subscribe((result)=>{
     
      this.query_subject.next(result)    
    })

    

  }


  toggleOnAutoComplete(){
    this.openSearchAutoComplete = true
  }
  toggleOffAutoComplete(){
    setTimeout(()=>{
      this.openSearchAutoComplete = false
    },300)    
  }

  navigateToCreate() {
    this.router.navigate(['posts/create'])
  }

  navigateToProfile() {
    if(this.profile_username != undefined){
      this.router.navigate([this.profile_username])
    }

    
  }
  navigateToHome() {
    this.open_mobile_search_popup = false
    this.router.navigate([''])    
  }
  MyProfileName(){ 
    this.open_mobile_search_popup = false   
    this.utils.profile_subject.subscribe((data)=>{
      this.profile_username = data['username']
    })

  }
  
  navigateToMobileNotify() {
    this.open_mobile_search_popup = false
    
  }
  ngOnInit(): void {
    this.utils.ProfileName()
    this.MyProfileName()
    this.searchQuery()

  }


}
