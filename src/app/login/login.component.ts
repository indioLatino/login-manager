import {Component, OnInit} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {Auth} from 'aws-amplify';
import {User} from '../user';
import {MessageService} from '../services/message.service';
import {AuthenticationDetails, ISignUpResult, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    login: '',
    password: ''
  };
  private signingIn = false;
  userCognito: any;
  greeting: string;

  constructor(private amplifyService: AmplifyService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.messageService.clear();
    this.signingIn = true;
    Auth.signIn(this.user.login, this.user.password)
      .then(user => this.onSuccessLogin(user))
      .catch(err => this.onErrorlogin(err));
    // Auth.confirmSignIn(user, code, mfaType)
    // .then(data => console.log(data))
    // .catch(err => console.log(err));
  }

  onErrorlogin(error: any) {
    this.signingIn = false;
    console.log(error);
    this.messageService.addError(error.message);
  }

  onSuccessLogin(user: CognitoUser) {
    console.log(user);
    this.signingIn = false;
    this.messageService.add('Logado correctamente');
    // todo: Very important to limit the domain to send the message
     window.parent.postMessage(JSON.parse(JSON.stringify(user)), '*');
  }


}
