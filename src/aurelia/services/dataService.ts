import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { IUser } from './../../shared/models/IUser';
import { Router } from 'aurelia-router';
import 'fetch';

@autoinject
export class DataService {
    jwt: string;

    constructor(private http: HttpClient, private router: Router) {
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
                body: json({ email: email, password: password })
            })
            .then(response => response.json())
            .then((response: any) => this.jwt = response.jwt)
            .catch(error => this.handleRequestError(error));
    }

    register(email, password) {
        return this.http.fetch('api/user/register',
            {
                method: 'post',
                body: json({ email: email, password: password })
            })
            .then(response => response.json())
            .then((response: any) => this.jwt = response.jwt)
            .catch(error => this.handleRequestError(error));
    }

    whoami(): Promise<IUser> {
        return this.getRequest('api/user/whoami');
    }

    getRecipes(): Promise<any> {
        return this.getRequest('api/recipe');
    }

    getRecipe(id: string): Promise<any> {
        return this.getRequest('api/recipe/recipe/' + id);
    }

    createRecipe(recipe: any): Promise<any> {
        return this.postRequest('api/recipe', recipe);
    }

    updateRecipe(recipe: any): Promise<any> {
        return this.putRequest('api/recipe/' + recipe.id, recipe);
    }

    deleteRecipe(id: string): Promise<any> {
        return this.deleteRecipe('api/recipe/' + id);
    }

    private getRequest(url: string, headers?: any): Promise<any> {
        return this.authenticatedRequest(url, {
            method: 'get',
            headers: headers
        });
    }

    private postRequest(url: string, body?: any, headers?: any): Promise<any> {
        return this.authenticatedRequest(url, {
            method: 'post',
            body: json(body),
            headers: headers
        });
    }

    private putRequest(url: string, body?: any, headers?: any): Promise<any> {
        return this.authenticatedRequest(url, {
            method: 'put',
            body: json(body),
            headers: headers
        });
    }

    private deleteRequest(url: string, headers?: any): Promise<any> {
        return this.authenticatedRequest(url, {
            method: 'delete',
            headers: headers
        });
    }

    private addAuthToHeaders(headers: any): any {
        if (headers == null) {
            headers = {};
        }
        headers.Authorization = 'JWT ' + this.jwt;

        return headers;
    }

    private handleRequestError(error) {
        console.error(error);
        if (error.status == 401) {//unauthorized
            this.router.navigateToRoute('login');
        }
        throw error;
    }

    private authenticatedRequest(url, options) {
        options.headers = this.addAuthToHeaders(options.headers);
        return this.http.fetch(url, options)
            .then(response => {
                console.log(response.body);
                return response.json();
            })
            .catch(error => this.handleRequestError(error));
    }
}