import { Component, OnInit } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from "angular2/router";

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'rb-view-applicant',
    template: `
        <ol class="breadcrumb">
            <li><a [routerLink]="['AdminMain']">Home</a></li>
            <li>Job Applicants</li>
        </ol>
        <div class="row">
            <div class="col-xs-12">
                <a class="list-group-item clearfix" *ngFor="#user of users">
                    <h4 (click)="userProfile(user._id)" class="list-group-item-heading">{{ user.firstName }} {{ user.lastName }}</h4>
                </a>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})

export class ViewApplicantComponent implements OnInit {
    
    public users: User[] = [];

    public jobId: string;

    constructor(public userService: UserService, public router: Router, public routeParams: RouteParams) { 

    }

    ngOnInit() {
        this.jobId = this.routeParams.get('id');
        this.userService.getUsersByJobId(this.jobId)
        .subscribe(
            users => {
                this.users = users,
                this.userService.users = users
            },
            error => console.log(error)
        );
    }

    userProfile(userId: string) {
        this.router.navigate(['CompleteProfile', {id: userId}]);
    }

}