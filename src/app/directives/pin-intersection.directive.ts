import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import e from 'express';

@Directive({
  selector: '[PinIntersection]',
  standalone: true
})
export class PinIntersectionDirective implements AfterViewInit {



  container! : HTMLElement;

  

  constructor(private element: ElementRef, private renderer : Renderer2) { 
    this.container = element.nativeElement as HTMLImageElement
    
    
  }

  ngAfterViewInit(): void {
    
    const observer  = new IntersectionObserver(entries =>{
      entries.forEach(entry =>{
        if(entry.isIntersecting){
          let ImageElement = entry.target as HTMLImageElement;
         
          let source =  `${ImageElement.getAttribute('source')}` 
          
          
          

          if(source){
            ImageElement.src = source

           
          }else{
            //console.log('No source', source)
          }
          observer.observe(ImageElement)
        }
      })
    })
    observer.observe(this.container)
  }
  

}
