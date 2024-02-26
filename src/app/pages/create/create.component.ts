import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { EMPTY, catchError } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
    HttpClientModule,
    MatIconModule,
    ToolbarComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
[x: string]: any;

  fileData! : FormGroup;
  form_is_submited: boolean = false
  process_name: string = 'Publish post'
  process_class_name: string = ''
  preview_image_url : string = ''
  file_inputed : boolean = false
  file_input_classname  : string= ''

  formDescData! : FormGroup;
  
  file : any ;

  constructor(private fb:FormBuilder, private router: Router, private http: HttpClient){
    this.fileData = this.fb.group({
      imagePost:[
        '',
        {validators: [Validators.required]}
    ],    
    })

    this.formDescData = this.fb.group({
      title: [
        ''
      ],
      description:[
        ''
      ],
      link: [
        ''
      ],
      tagged_topics:[
        ''
      ]
     
    })
  }

  

  onSubmitPost(){
    this.form_is_submited = true
    this.process_name = 'publishing...'
    this.process_class_name  = 'processing'

    const Data = new FormData()
    
    const api_url = 'http://localhost:8000/pins/create'

    Data.append('image', this.file)
    Data.append('title', this.formDescData.get('title')?.value)
    Data.append('description', this.formDescData.get('description')?.value)
    Data.append('link', this.formDescData.get('link')?.value)
    Data.append('tagged_topics', this.formDescData.get('tagged_topics')?.value)

    const is_server = typeof window === "undefined"

    let token: any;

    if(!is_server){
      const tokenExists = localStorage.getItem('access_token')
      if(tokenExists){
        token = tokenExists
      }
    }

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    })

    this.http.post(api_url, Data, {headers}).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err){
          console.log(err.error)
          this.process_class_name  = ''
          this.form_is_submited = false
          this.process_name = 'failed!'

          setTimeout(()=>{
            this.process_name = 'Try again'
          },1000)


        }
        return EMPTY
      })
    ).subscribe((result)=>{
      console.log(result)
      this.form_is_submited = false
      //use to do animations with spinner
      this.process_class_name  = ''
      //change ^^ the background for animation
      this.process_name = 'Done!'
      setTimeout(()=>{
        this.process_name = 'Publish post'
      },1000)
      //removes image previw
      this.file_inputed = false
      //'' gets the drag and drop back to difault
      this.file_input_classname  = ''
      this.fileData.reset()
      this.formDescData.reset()
    })



  }
  onFileInput($event : any){
    

    const file = $event.target?.files

    if(file){
      if(file.length > 0){
        this.file = file[0]
        const imageUrl = URL.createObjectURL(file[0])
        this.file_inputed = true
        this.preview_image_url = imageUrl
        this.file_input_classname  = 'displayNone'
      }else{
        this.preview_image_url = ''
        this.file_inputed = false
        this.file_input_classname  = ''
      }
      

      // file from drop event
    }else if(!file){
      if($event.length > 0){
        this.file = $event[0]
        const imageUrl = URL.createObjectURL($event[0])
        this.file_inputed = true
        this.preview_image_url = imageUrl
        this.file_input_classname  = 'displayNone'        
      }else{
        this.preview_image_url = ''
        this.file_inputed = false
        this.file_input_classname  = ''

      }
    }

    
    

  }

  onFileDrop($event : DragEvent){
    $event.preventDefault()
    const file = $event.dataTransfer?.files

    this.onFileInput(file)

  }

  onFileDragOver($event: DragEvent){
    $event.preventDefault()
   

  }

}
