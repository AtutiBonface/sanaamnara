import { AfterContentInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { setInterval } from 'node:timers/promises';

@Directive({
  selector: '[TaswiraimageSlider]',
  standalone: true
})
export class UnauthAnimationDirective implements AfterContentInit{

  ImageBox! : HTMLElement

  items: any;

  constructor(private element: ElementRef, private renderer: Renderer2) { 
    this.ImageBox = this.element.nativeElement as HTMLDivElement

    this.items = Array.from(this.ImageBox.children) as HTMLElement[];

    this.startAnimation()

    
  }
  myAnimation(){

    var currentItem = 0

    
      this.expandImage(currentItem);
      currentItem = (currentItem + 1) % this.items.length;
      return currentItem
   

    

  }

  startAnimation(){
   

    setInterval(5000,this.myAnimation())

    

  }
  expandImage(index: number){
    

    this.items.forEach((item: any, i: number)=>{

     if(i !== index){
      this.renderer.removeClass(item, 'expand')
      this.renderer.addClass(item, 'colapse')

      
      

     }else{
      this.renderer.addClass(item, 'expand')
      
     }
    })
  }

  ngAfterContentInit(): void {

    

    
    
  }

  

}
