import {autoinject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserService} from './../services/userService';

@autoinject
export class NavBar {
    @bindable router: Router;

    constructor(private userService: UserService){
        
    }
}