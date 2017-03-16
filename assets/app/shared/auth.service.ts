import { Http, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from './user';

@Injectable()
export class AuthService { 

    constructor(public http: Http) {

    }

    public adminLogin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        return this.http.post('http://localhost:3000/login/admin-login', body, {headers: headers})
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    public applicantLogin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        return this.http.post('http://localhost:3000/login/applicant-login', body, {headers: headers})
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    public logout() {
        localStorage.clear();
    }

    public isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    public isAuthenticated() {
        if (localStorage.getItem('token') !== null) {
        return true;
        } else {
        return false;
        }
    }

    public adminAdd(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        return this.http.post('http://localhost:3000/login/add-admin', body, {headers: headers})
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

}