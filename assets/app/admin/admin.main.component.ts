import { Component, OnInit } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES } from "angular2/router";


import { Job } from '../shared/job.ts';
import { JobService } from '../shared/job.service';
import { PostEditJobComponent } from './post.edit.job.component';
import { ViewRegisteredUsersComponent } from './view.registered.users.component';
import { ViewApplicantComponent } from './view.applicant.component';
import { DateTransform } from '../shared/date.transform.pipe';

@Component({
    selector: 'rb-admin-main',
    template: `
        <h1>Welcome to Administrators Only Page</h1>
        <ol class="breadcrumb">
            <li><a [routerLink]="['AdminMain']">Home</a></li>
        </ol>
        <div>
        <button type="button" class="btn btn-success" (click)="postNewJobs()">Post New Jobs</button>
        <button type="button" class="btn btn-primary" [routerLink]="['RegisteredUsers']">Registered Users</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Number of Jobs</th><th>Job Title</th><th>Job Description</th><th>Job Posted Date</th>
                    <th>Job End Date</th><th>No of Applicants</th><th>Edit Jobs</th><th>Delete Jobs</th>
                </tr>
            </thead>
            <tbody *ngFor="#job of jobs; #i = index">
                <tr>
                    <td>{{ i + 1 }}</td>
                    <td>{{ job.jobTitle }}</td>
                    <td>{{ job.jobDescription }}</td>
                    <td>{{ job.jobPostedDate | datetransform | date }}</td>
                    <td>{{ job.jobEndDate | datetransform | date }}</td>
                    <td><button type="button" class="btn btn-warning" (click)="viewApplicants(job.jobId)">View Applicants</button></td>
                    <td><button type="button" class="btn btn-info" (click)="jobEdit(job.jobId)">Edit</button></td>
                    <td><button type="button" class="btn btn-danger" (click)="jobDelete(job)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [JobService, ViewApplicantComponent],
    pipes: [DateTransform]
})

export class AdminMainComponent implements OnInit {

    public jobs: Job[];

    constructor(public jobService: JobService, public router: Router) { 

    }

    ngOnInit() {
        this.jobService.getJobs()
        .subscribe(
            jobs => {
                this.jobs = jobs
                this.jobService.jobs = jobs;
            },
            error => console.log(error)
        );
    }

    public postNewJobs() {
        this.router.navigate(['PostEditJob', {id: null}]);
    }

    public jobEdit(jobId: string) {
        this.router.navigate(['PostEditJob', {id: jobId}]);
    }

    public viewApplicants(jobId: string) {
        this.router.navigate(['ViewApplicant', {id: jobId}]);
    }

    public jobDelete(job: Job) {
        this.jobService.deleteJob(job)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    public registeredUsers() {
        this.router.navigate(['RegisteredUsers']);
    }
}