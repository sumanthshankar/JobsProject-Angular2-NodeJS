import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from "angular2/router";

import { AuthService } from './shared/auth.service';

@Component({
    selector: 'my-header',
    template: `
        <nav class="navbar navbar-default">
        <div class="container-fluid">
        <div class="navbar-header">
            <a [routerLink]="['Start']" class="navbar-brand"><span class="glyphicon glyphicon-home" aria-hidden="true"></span></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li><a [routerLink]="['Admin']" *ngIf="!isLoggedIn()">Administrators <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></a></li>
            <li><a [routerLink]="['Applicant']" *ngIf="!isLoggedIn()">Applicants <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></a></li>
            <li><a [routerLink]="['Add']" *ngIf="!isLoggedIn()">New Applicants <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li><a (click)="logout()" *ngIf="isLoggedIn()">Logout <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></a></li>
        </ul>
        </div>
        </div>
    </nav>
    `,
    directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {

    constructor(public authService: AuthService, public router: Router) { 

    }

    public isLoggedIn() {
            return this.authService.isLoggedIn();
    }

    public logout() {
            this.authService.logout();
            this.router.navigate(['Start']);
    }

}