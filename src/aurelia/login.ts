import {autoinject} from 'aurelia-framework';
import {UserService} from './services/userService';

@autoinject
export class Welcome {
  email: string;
  password: string;

  loggedIn: boolean = false;

  constructor(private userService: UserService) {

  }

  activate() {
    
  }

  login() {
    this.userService.login(this.email, this.password).then(() => this.loggedIn = true);
  }

  register() {
    this.userService.register(this.email, this.password).then(() => this.loggedIn = true);;
  }

  







}

