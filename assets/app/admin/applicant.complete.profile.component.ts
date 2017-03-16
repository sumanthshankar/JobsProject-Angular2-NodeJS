import { Component, OnInit } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from "angular2/router";

import { User } from '../shared/user';
import { Job } from '../shared/job';
import { Education } from '../shared/education';
import { UserService } from '../shared/user.service';
import { DateTransform } from '../shared/date.transform.pipe';

@Component({
    selector: 'rb-view-applicant',
    template: `
        <ol class="breadcrumb">
            <li><a [routerLink]="['AdminMain']">Home</a></li>
            <li><a>Job Applicants</a></li>
            <li>Applicant Compelete Profile</li>
        </ol>
        <div class="row">
        <div class="form-group row">
            <label for="example-text-input" class="col-xs-2 col-form-label">First Name:</label>
                <div class="col-xs-10">
                    {{ firstName }}
                </div>
        </div>
        <div class="form-group row">
            <label for="example-text-input" class="col-xs-2 col-form-label">Last Name:</label>
                <div class="col-xs-10">
                    {{ lastName }}
                </div>
        </div>
        <div class="form-group row">
            <label for="example-text-input" class="col-xs-2 col-form-label">Email Id:</label>
                <div class="col-xs-10">
                    {{ emailId }}
                </div>
        </div>
        <hr>
        <div *ngIf="educationProfiles">
        <h4>Education Details</h4>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No:</th><th>Degree:</th><th>University:</th><th>Passed Year:</th>
                </tr>
            </thead>
            <tbody *ngFor="#education of educationProfiles; #i = index">
                <tr>
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ education?.major }}</td>
                    <td>{{ education?.university }}</td>
                    <td>{{ education?.year }}</td>
                </tr>
            </tbody>
        </table>
        </div>
        <hr>
        <h4 *ngIf="!appledJobs">This applicant has not applied for any job</h4>
        <div *ngIf="appledJobs">
        <h4>Jobs Applied</h4>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No:</th><th>Job Title:</th><th>Job Description:</th>
                    <th>Appled On:</th><th>Delete Jobs</th>
                </tr>
            </thead>
            <tbody *ngFor="#job of appledJobs; #i = index">
                <tr>
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ job?.jobTitle }}</td>
                    <td>{{ job?.jobDescription }}</td>
                    <td>{{ job?.appliedOn | datetransform | date }}</td>
                    <td><button type="button" class="btn btn-danger" (click)="deleteJob(job?.jobId)" (click)="userJobDelete(job?.jobId)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        </div>    
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    pipes: [DateTransform]
})

export class ApplicantCompleteProfile implements OnInit {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public emailId: string;
    public appledJobs: Job[] = [];
    public educationProfiles: Education[] = [];

    constructor(public userService: UserService, public routeParams: RouteParams) { 

    }

    ngOnInit() {
        this.userId = + this.routeParams.get('id');
        this.userService.getUserByIdJobs(this.userId)
        .subscribe(
            user => {
                this.firstName = user.firstName,
                this.lastName = user.lastName,
                this.emailId = user.emailId,
                this.educationProfiles = user.educationProfile,
                this.userService.job = user.appliedJobs,
                this.appledJobs = this.userService.job
            },
            error => console.log(error)
        );
    }

    public userJobDelete(jobId: number) {
        this.userService.userJobDelete(this.userId, jobId)
        .subscribe(
            error => console.log(error)
        );
    }

    public deleteJob(jobId: number) {
        for(var i = this.appledJobs.length-1; i >= 0; i--) {
            if( this.appledJobs[i].jobId === jobId) this.appledJobs.splice(i, 1);
        }
    }

}