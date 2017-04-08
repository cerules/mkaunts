import { autoinject } from 'aurelia-framework';
import {IUser} from './../../shared/models/IUser';
import {DataService} from './dataService';
import 'fetch';

@autoinject
export class UserService {
    user: IUser;
    
    constructor(private dataService: DataService) {

    }

    login(email, password) {
        return this.dataService.login(email, password)
            .then(() => this.whoAmI());
    }

    register(email, password) {
        return this.dataService.register(email, password)
            .then(() => this.whoAmI());
    }

    whoAmI() {
        return this.dataService.whoAmI()
            .then(user => {
                console.log(user);
                this.user = user;
            });
    }
}