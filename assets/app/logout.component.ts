import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { AuthService } from './shared/auth.service';

@Component({
    selector: 'rb-admin',
    template: ``
})

export class LogoutComponent {

    constructor(public authService: AuthService, public router: Router) { 

    }

    userLogout() {
        this.authService.logout();
        this.router.navigate(['Start']);
    }
}