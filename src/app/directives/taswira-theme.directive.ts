import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[TaswiraTheme]',
  standalone: true
})
export class TaswiraThemeDirective  implements OnInit{

  TaswiraHtml! : HTMLElement

  constructor(
    private renderer: Renderer2,
    private element : ElementRef
  ) { 
    
  }

  TaswiraTheme(){
    this.TaswiraHtml = this.element.nativeElement as HTMLElement
    let is_server = typeof window === 'undefined';
    if(!is_server){
      let theme = localStorage.getItem('theme')
      if(theme === null){
        localStorage.setItem('theme', 'light')
        this.renderer.setAttribute(this.TaswiraHtml, 'theme','light')
      }else{
        this.renderer.setAttribute(this.TaswiraHtml, 'theme',`${theme}`)
      }
    }
  }

  ngOnInit(): void {
    this.TaswiraTheme()
    
  }


}
