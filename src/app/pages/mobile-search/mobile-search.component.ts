import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SearchAutoCompleteComponent } from '../../utils/search-auto-complete/search-auto-complete.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-search',
  standalone: true,
  imports: [
    MatIconModule,
    SearchAutoCompleteComponent,
    CommonModule,
  ],
  templateUrl: './mobile-search.component.html',
  styleUrl: './mobile-search.component.scss'
})
export class MobileSearchComponent {

}
