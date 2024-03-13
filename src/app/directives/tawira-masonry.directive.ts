import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[TawirMasonry]',
  standalone: true
})
export class TawiraMasonryDirective implements OnInit, AfterViewInit{

  private container!: HTMLElement;
  private columns!: number;
  private columnHeights!: number[];

  constructor(private element : ElementRef, private renderer: Renderer2) { 
   
  }

  ngAfterViewInit(): void {
    
    
    window.addEventListener('resize', () => {
      this.updateColumns();
    });
      
    
  }
  ngOnInit(): void {
    this.container = this.element.nativeElement as HTMLElement
    this.columns = 6; // Initial column count
    this.columnHeights = []; 
    setTimeout(()=>{
      this.updateColumns()
    },1000)   
  }

  

  layout(): void {
    
    const items = Array.from(this.container.children) as HTMLElement[];
      items.forEach((item) => {
        const column = this.getMinHeightColumn();
        const left = (100 / this.columns) * column;
        const top = this.columnHeights[column];
        this.renderer.setStyle(item, 'position', 'absolute')
        this.renderer.setStyle(item, 'top', `${top}px`)
        this.renderer.setStyle(item, 'left', `${left}%`)
        this.columnHeights[column] += item.offsetHeight;
      });
      const maxHeight = Math.max(...this.columnHeights);      
      this.renderer.setStyle(this.container, 'height', `${maxHeight}px`)
      

     
    
  }

  updateColumns(): void {
    const screenWidth = window.innerWidth;
        if (screenWidth >= 600) {
          this.columns = 4;
        } else if (screenWidth >= 500) {
          this.columns = 4;
        } else if (screenWidth >= 450) {
          this.columns = 3;
        } else {
          this.columns = 2;
        }
        this.columnHeights = Array.from<any>({ length: this.columns }).fill(0);
        this.layout(); 
    
  }

  getMinHeightColumn(): number {


    
    return this.columnHeights.indexOf(Math.min(...this.columnHeights));
    
  }


  

  

}
