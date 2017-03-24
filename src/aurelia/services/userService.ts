import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class UserService {
    token: string;
    email: string;

    constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
            credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'X-Requested-With': 'Fetch'
			}
        });
    });
    }

    login(email, password) {
        return this.http.fetch('api/user/login', 
        {
            method: 'post',
            body: json({email: email, password: password})
        })
        .then(response => response.json())
        .then((response: any) => this.token = response.token)
        .then(() => this.whoami());
  }

  register(email, password) {
        return this.http.fetch('api/user/register', 
        {
            method: 'post',
            body: json({email: email, password: password})
        })
        .then(response => response.json())
        .then((response: any) => this.token = response.token)
        .then(() => this.whoami());
  }

  whoami() {
      return this.http.fetch('api/user/whoami', {
        method: 'get',
        headers: {'Authorization': 'JWT ' + this.token}
      }).then(response => response.json())
        .then((response: any) => this.email = response.email);
  }
}