import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { MessageService } from '../message.service';
import { AuthenticationDetails, ISignUpResult, CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";
import { Gender } from '../gender';
import { FormGroup , FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject,Observable} from 'rxjs';
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
  user_password_confirmation: "",
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
  //firstScreenDirty:boolean=false;
  private firstScreenDirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public firstScreenDirtyObs: Observable<boolean> = this.firstScreenDirty.asObservable();

  //Variable to check if both passwords typed coincide
  private arePasswordsDifferent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public arePasswordsDifferentObs: Observable<boolean> = this.arePasswordsDifferent.asObservable();

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
      password: new FormControl('',Validators.compose([Validators.minLength(6),Validators.required])),
      password_confirmation: new FormControl('',Validators.required),
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
    //Validate if passwords are the same
    if(this.register.user_password == this.register.user_password_confirmation){
      this.arePasswordsDifferent.next(false);
    }else{
      this.arePasswordsDifferent.next(true);
    }
    if(this.form.controls.password.valid && this.form.controls.password_confirmation.valid && this.form.controls.email.valid && this.form.controls.lastname.valid&&this.form.controls.name.valid&&this.arePasswordsDifferentObs){
      this.firstScreenDirty.next(false);
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
