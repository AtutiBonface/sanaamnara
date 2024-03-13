import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonUtilsService } from '../../services/common-utils.service';
import { AllpinsService } from '../../services/allpins.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  
    
    
  ],
  providers:[
    CommonUtilsService,
    AllpinsService
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Output() closePopup :EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input() PinID: any; 
  @Input() image_url!: string; 

  constructor(
    private utils: CommonUtilsService,
    private service: AllpinsService
  ){
    
  }

  closeMyPopup(){
    this.closePopup.emit(true)
  }

  savePost(){
    this.utils.savePost(this.PinID)
    
  }

  downLoadImage(){
   
    const anchor = document.createElement('a')
    anchor.style.display = 'none'
    anchor.href = this.image_url
    anchor.download = `Taswira-users-images-7${this.image_url}`

    document.body.appendChild(anchor)

    anchor.click()

    document.body.removeChild(anchor)

  }






}
