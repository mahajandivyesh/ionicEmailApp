import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-email-composer',
  templateUrl: './email-composer.page.html',
  styleUrls: ['./email-composer.page.scss'],
})
export class EmailComposerPage implements OnInit {

  showOtherTo: boolean = false;
  // emailForm: FormGroup;
  attachments: any = [];
  formErrors: any = {};
  emailForm: any;
  constructor(
    private emailComposer : EmailComposer,
    private formBuilder : FormBuilder,
    public fileService: FileService
  ) {
    console.log(this.emailComposer);
    // this.emailForm = this.formBuilder.group({
    //   to : new FormControl('dvsmahajan@hotmail.com', Validators.compose([ 
    //                           Validators.required, 
    //                           Validators.email, 
    //                           Validators.maxLength(50) 
    //                       ])),
    //   cc : new FormControl('', Validators.compose([ 
    //                             Validators.email, 
    //                             Validators.maxLength(50) 
    //                           ])),
    //   bcc : new FormControl('', Validators.compose([ 
    //                           Validators.email, 
    //                           Validators.maxLength(50) 
    //                         ])),
    //   subject : new FormControl('testing', Validators.compose([ 
    //                                   Validators.required, 
    //                                   Validators.maxLength(50) 
    //                                 ])),
    //   body : new FormControl('this is body for test message', Validators.compose([ 
    //                               Validators.required, 
    //                               Validators.maxLength(500) 
    //                             ])),
    // }) 
  }

  ngOnInit() {
  }
  sendEmail() {
    // console.log(this.emailForm.value);
    // if ( !this.emailForm.valid ) {
    //   console.error('Invalid form is not accepted!');
    //   return false;
    // }
    let emailData = {
      to:'dvsmahajan@hotmail.com',
      cc:'', 
      bcc:'',
      subject:'testing',
      body:'this is body for test message'
    }
    let files = [];
    this.fileService.files.forEach(file => {
      files.push(file.path);      
    });
    let email: EmailComposerOptions = {
      ...emailData,
      attachments : files,
      isHtml: true
    }
    this.emailComposer.open(email);
  }
  selectFile() {
    this.fileService.selectImage();
  }
  deleteAttachment( i: number ) {
    console.info(`Delete attachment with index -> ${i}`);
    if ( this.fileService.files[i] ) {
      this.fileService.files.splice(i, 1);
    }
  }
  getError( input : string ) {
    const errors = this.emailForm.controls[input].errors || {};
    const messages = {
      required : `(${input}) field is required`,
      email : `(${input}) field should be a valid email`,
      maxlength : `(${input}) field should be less than `
    }
    for (let error of Object.keys(errors)) {
      
      if (messages[error]) {
        if ( error === 'maxlength' || error === 'minlength' ) {
          this.formErrors[input] = messages[error] + errors[error]['requiredLength'] + ' chars';
        } else {
          this.formErrors[input] = messages[error];
        }
      } else {
        console.error(`${error} - equivalent message not found!`);
      }
      
      console.log(errors);
    }
    if ( Object.keys(errors).length === 0 ) {
      this.formErrors[input] = null;
    }
  }

  onClickSendMail(){
    this.sendEmail();
  }
}
