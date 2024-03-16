import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[PinContainerIntersection]',
  standalone: true
})
export class PinContainerIntersectionDirective implements AfterViewInit {

  container! : HTMLElement;

  constructor(private renderer: Renderer2, private element: ElementRef) { }


  ngAfterViewInit(): void {
    this.container = this.element.nativeElement as HTMLDivElement
    this.renderer.setStyle(this.container, 'width', '0')
    

    const observer = new IntersectionObserver(entries =>{
      entries.forEach(entry=>{
        const myDiv = entry.target as HTMLDivElement
        this.renderer.setStyle(myDiv, 'width', 'fit-content')
      })
    })
  }


}
