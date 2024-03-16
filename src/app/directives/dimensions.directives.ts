import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[Dimensions]',
    standalone: true
  })
  export class DimensionsDirective implements AfterViewInit{
    container! : HTMLElement;
    public screenWidth: any;
      public actualImageHeight : any; 
      public actualImageWidth : any ;
    constructor(private element: ElementRef, private renderer: Renderer2){
      this.container = this.element.nativeElement as HTMLDivElement;

      window.addEventListener('resize', ()=>{
        this.imageSizes()
      })

    }

    ngAfterViewInit(): void {
      this.screenWidth = window.innerWidth
      this.actualImageHeight = this.container.getAttribute('D_height')
      this.actualImageWidth = this.container.getAttribute('D_width')

      this.imageSizes()     
    }

    imageSizes(){
      if(this.screenWidth> 1200){
        const imageWidth = (this.screenWidth/6)-40
        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`) 
      }
      else if(this.screenWidth>1000){
        const imageWidth = (this.screenWidth/5)-20
        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`) 

      }

      else if(this.screenWidth>850){
        const imageWidth = (this.screenWidth/4)-70
        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`) 

      }

      else if(this.screenWidth>750){
        const imageWidth = (this.screenWidth/3)-70
        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`) 
        
      }

      else if(this.screenWidth>650){
        const imageWidth = (this.screenWidth/3)-50
        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`)       

      }

      else if(this.screenWidth > 500){
        const imageWidth = (this.screenWidth/2)-60

        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`)       
        
      }else if(this.screenWidth > 300){
        const halfWidth = (this.screenWidth/2)-20
        
        const imageDimensionRatio =( this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * halfWidth

        this.renderer.setStyle(this.container, 'width', `${halfWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`)

      }else{
        const imageWidth = (this.screenWidth)-70;
        const imageDimensionRatio =(this.actualImageHeight/this.actualImageWidth)

        const neededImageHeight = imageDimensionRatio * imageWidth

        this.renderer.setStyle(this.container, 'width', `${imageWidth}px`)
        this.renderer.setStyle(this.container, 'height', `${neededImageHeight}px`)

      }
    }
  }


