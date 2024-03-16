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

  constructor(
    private location: Location,
  ){}
  
  
  
  
  moveBack() {
    this.location.back()
  
  }

}
