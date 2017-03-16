import { Component, OnInit } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES } from "angular2/router";

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'rb-registered-users',
    template: `
    <ol class="breadcrumb">
            <li><a [routerLink]="['AdminMain']">Home</a></li>
            <li>Registered Users</li>
        </ol>
        <div class="row">
            <div class="col-xs-12">
                <a class="list-group-item clearfix" *ngFor="#user of users">
                    <h4 (click)="userProfile(user.userId)" class="list-group-item-heading">{{ user.firstName }} {{ user.lastName }}</h4>
                </a>
            </div>   
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

export class ViewRegisteredUsersComponent implements OnInit {

    public users: User[] = [];

    constructor(public userService: UserService, public router: Router) { 

    }

    public ngOnInit() {
        this.userService.getUsers()
        .subscribe(
            users => {
                this.users = users,
                this.userService.users = users
            },
            error => console.log(error)
        );
    }

    public userProfile(userId: string) {
        this.router.navigate(['CompleteProfile', {id: userId}]);
    }

}