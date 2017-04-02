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
            .then(() => this.whoami());
    }

    register(email, password) {
        return this.dataService.register(email, password)
            .then(() => this.whoami());
    }

    whoami() {
        return this.dataService.whoami()
            .then(user => this.user = user);
    }
}