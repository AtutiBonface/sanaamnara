import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { TaswiraThemeDirective } from '../../directives/taswira-theme.directive';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    MatIconModule,
    SpinnerComponent,
    TaswiraThemeDirective,

  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {


  nameChangesOpened: any = false
  contactChangesOpened: any = false
  passwordChangesOpened: any = false
  promptPassword: any = false

  constructor(
    private location: Location,
  ){}
  
  
  
  
  moveBack() {
    this.location.back()
  
  }

  openPasswordChanges() {
    this.passwordChangesOpened = true

  }
  openContactChanges() {
    this.contactChangesOpened = true
    
  }
  openNameChanges() {

    this.nameChangesOpened = true
    
  }

  openPromptpassword() {
    this.promptPassword = true
  }
  closePromptpassword(){
    this.promptPassword = false
  }

}
