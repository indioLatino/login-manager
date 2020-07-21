import {Component, OnInit} from '@angular/core';
import {Register} from '../register';
import {Auth} from 'aws-amplify';
import {AmplifyService} from 'aws-amplify-angular';
import {MessageService} from '../services/message.service';
import {AuthenticationDetails, ISignUpResult, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {Gender} from '../gender';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {FoodieUser} from '../models/foodie-user';
import {FoodieRestService} from '../services/foodie-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  // todo add a nickname formcontrol linked to the object register
  register: Register = {
    user_name: '',
    user_lastname: '',
    user_birthdate: '',
    user_email: '',
    user_password: '',
    user_password_confirmation: '',
    user_gender: ''
  };

  genders: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'other', viewValue: 'Other'},
    {value: 'rathernottosay', viewValue: 'Rather not to say'}
  ];
  //Variable to control what registration substring to show
  registerScreen: string = '1';
  form: FormGroup;
  //Variable to set the email validation
  emailCtrl: FormControl;
  //Variable to control if all the fields in the first screen of registration have been filled
  //firstScreenDirty:boolean=false;
  private firstScreenDirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public firstScreenDirtyObs: Observable<boolean> = this.firstScreenDirty.asObservable();

  //Variable to check if both passwords typed coincide
  private arePasswordsDifferent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public arePasswordsDifferentObs: Observable<boolean> = this.arePasswordsDifferent.asObservable();

  constructor(private amplifyService: AmplifyService, private messageService: MessageService, private fBuilder: FormBuilder, private foodieService: FoodieRestService) {
    // this.fGroup = fBuilder.group({
    //   email: ['', Validators.email]
    //});
  }

  ngOnInit() {
    this.emailCtrl = new FormControl('', Validators.compose([Validators.email, Validators.required]));
    this.form = new FormGroup({
      email: this.emailCtrl,
      name: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
      password_confirmation: new FormControl('', Validators.required),
      usergender: new FormControl('', Validators.required)

    });
    this.form;
  }

  onSubmit() {
    this.onRegister();
  }

  nextRegisterScreen() {
    this.registerScreen = '2';
  }

  screenOneFilled() {
    //Validate if passwords are the same
    if (this.register.user_password == this.register.user_password_confirmation) {
      this.arePasswordsDifferent.next(false);
    } else {
      this.arePasswordsDifferent.next(true);
    }
    if (this.form.controls.password.valid && this.form.controls.password_confirmation.valid && this.form.controls.email.valid && this.form.controls.lastname.valid && this.form.controls.name.valid && this.arePasswordsDifferentObs) {
      this.firstScreenDirty.next(false);
    }
  }

  // todo: wrap all of these parameters in a model to pass a single parameter
  onRegister() {
    let attributes = [];
    let dataEmail = {
      Name: 'email',
      Value: this.register.user_email
    };
    //Attributes did not conform to the schema: name: The attribute is required family_name: The attribute is required gender: The attribute is required birthdate: The attribute is required
    attributes.push(dataEmail);
    Auth.signUp({
      username: this.register.user_email,
      password: this.register.user_password,
      attributes: {
        email: this.register.user_email,
        birthdate: this.register.user_birthdate,
        family_name: this.register.user_lastname,
        name: this.register.user_name,
        gender: this.register.user_gender
      },
      validationData: []  //optional
    })
      .then(data => this.onSuccessRegister(data))
      .catch(err => this.onErrorRegister(err));
  }

  onErrorRegister(error: any) {
    if (error) {
      console.log(error);
      this.messageService.addError(error.message);
    }
  }

  onSuccessRegister(data: ISignUpResult) {
    console.log(data);
    const foodieUser = new FoodieUser();
    foodieUser.userName = this.register.user_name;
    foodieUser.userLastName = this.register.user_lastname;
    foodieUser.userEmail = this.register.user_email;
    // foodieUser.userCognitoName(data.user.username);
    foodieUser.userGender = this.register.user_gender;
    foodieUser.userNickname = this.register.user_name + ' ' + this.register.user_lastname;
    foodieUser.userPostsNumber = '0';
    foodieUser.userProfilePicture = '';
    foodieUser.cognitoUserSub = data.userSub;
    // todo: check a way to retrieve this data from cognito or if not do this on the server when the user is saved
    foodieUser.userRegistrationDate = '01-01-2020';
    this.foodieService.addUser(foodieUser).subscribe(() => {
      console.log('Correctooooo!!!');
    });
    this.messageService.add('Registrado correctamente');
  }
}
