import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { User } from '../user';
import { MessageService } from '../message.service';
import {AuthenticationDetails, ISignUpResult , CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user : User = {
		login:"",
		password:""
	};
    signedIn: boolean;
    userCognito: any;
    greeting: string;
  constructor(private amplifyService: AmplifyService,private messageService: MessageService) { 
  }

  ngOnInit() {
  }

  onSubmit() {
    this.messageService.clear();
    Auth.signIn(this.user.login, this.user.password)
    .then(user => console.log(user))
    .catch(err =>this.onErrorlogin(err));
    //Auth.confirmSignIn(user, code, mfaType)
    //.then(data => console.log(data))
    //.catch(err => console.log(err));
  }

  onErrorlogin(error:any){
    console.log(error);
    this.messageService.addError(error.message);
  }
  onSuccessLogin(user:CognitoUser){
    console.log(user);
    this.messageService.add('Logado correctamente');
  }



}
