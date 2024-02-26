import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchAutoCompleteComponent } from '../search-auto-complete/search-auto-complete.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    SearchAutoCompleteComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {


  openSearchAutoComplete : boolean = false
  is_logged_in = false

  searchData! : FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router){
    this.searchData = this.fb.group({
      query:['']
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
    this.router.navigate(['create'])
  }

  navigateToProfile() {
    this.router.navigate(['profile'])
  }
  navigateToHome() {
    this.router.navigate([''])    
  }


}
