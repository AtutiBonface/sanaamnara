import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule,} from '@angular/material/slide-toggle';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    TaswiraThemeDirective,
    ToolbarComponent,
    SpinnerComponent,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  logout: boolean = false;

  darkTheme : boolean = false

  myTheme : any;



  constructor(
    private router: Router,
    private location : Location
  ){
    const is_server = typeof window === 'undefined'
    if(!is_server){
      let theme = localStorage.getItem('theme')
     
      this.myTheme = theme
    }

  }


  moveBack(){
    this.location.back()
  }
  logoutUser() {
    const is_server = typeof window === 'undefined';
    if(!is_server){
      localStorage.clear()
      this.logout = true
      setTimeout(()=>{
        this.router.navigate([''])
      },1000)
    }
  }

  editProfile(){
    this.router.navigate(['profile/changes'])
  }

  toggleTheme() {
    const is_server = typeof window === 'undefined'
    if(!is_server){
      let theme = localStorage.getItem('theme')
      if(theme === 'light'){
        localStorage.setItem('theme', 'dark')
        this.darkTheme = false
        this.myTheme = 'dark'
      }else if(theme === 'dark'){
        localStorage.setItem('theme', 'light')
        this.darkTheme = true
        this.myTheme = 'light'
      }
      else{
        localStorage.setItem('theme', 'light')
        this.darkTheme = false
        this.myTheme = 'light'
      }
    }
  }

}
