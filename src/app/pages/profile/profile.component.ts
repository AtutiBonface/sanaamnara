import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    HttpClientModule,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
