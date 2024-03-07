import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  
    
    
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Output() closePopup :EventEmitter<boolean> = new EventEmitter<boolean>()

  closeMyPopup(){
    this.closePopup.emit(true)
  }

}
