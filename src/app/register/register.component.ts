import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { MessageService } from '../message.service';
import { AuthenticationDetails, ISignUpResult, CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";
import { Gender } from '../gender';
import { FormGroup , FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	register : Register = {
	user_name: "",
	user_lastname: "",
	user_birthdate: "",
	user_email: "",
	user_password: "",
  user_gender:""
	};

  genders: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'other', viewValue: 'Other'},
    {value: 'rathernottosay', viewValue: 'Rather not to say'}
  ];
  //Variable to control what registration substring to show
  registerScreen: string = "1";
  form:FormGroup;
  //Variable to set the email validation
  emailCtrl: FormControl;
  //Variable to control if all the fields in the first screen of registration have been filled
  firstScreenDirty:boolean=false;


  constructor(private amplifyService: AmplifyService,private messageService: MessageService, private fBuilder: FormBuilder) { 
     // this.fGroup = fBuilder.group({
       //   email: ['', Validators.email]
      //});
  }

  ngOnInit() {
    this.emailCtrl=new FormControl('',Validators.compose([Validators.email, Validators.required]));
    this.form = new FormGroup({
      email: this.emailCtrl,
      name: new FormControl('',Validators.required),
      birthdate: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required)
    });
    this.form
  }
  onSubmit(){
  	this.onRegister(this.register.user_name, this.register.user_password, this.register.user_email, this.register.user_birthdate, this.register.user_lastname, this.register.user_gender);
  }

  nextRegisterScreen(){
    this.registerScreen="2";
  }

  screenOneFilled(){
    if((this.form.hasError('required', ['name','lastname','email']))||(this.form.hasError('email', ['email']))){
      this.firstScreenDirty = true;
    }
  }
  
  onRegister(userName:string,userPassword:string, userEmail:string, user_birthdate:string, user_lastname:string, user_gender:string){
  	let attributes = [];
  	let dataEmail = {
            Name: 'email',
            Value: userEmail
        };
    //Attributes did not conform to the schema: name: The attribute is required family_name: The attribute is required gender: The attribute is required birthdate: The attribute is required
    attributes.push(dataEmail);
  	Auth.signUp({
    username:userEmail,
    password:userPassword,
    attributes:{
      email:userEmail,
      birthdate:user_birthdate,
      family_name:user_lastname,
      name:userEmail,
      gender:user_gender
    },
    validationData: []  //optional
    })
    .then(data => this.onSuccessRegister(data))
    .catch(err => this.onErrorRegister(err));
  }
  onErrorRegister(error:any){
  	if(error){
  		console.log(error)
  		this.messageService.addError(error.message);
  	}
  }
  onSuccessRegister(data:ISignUpResult){
  		console.log(data)
  		this.messageService.add('Registrado correctamente')
  }
}
