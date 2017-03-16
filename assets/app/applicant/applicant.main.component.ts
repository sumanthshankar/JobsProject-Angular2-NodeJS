import { Component, OnInit } from 'angular2/core';
import { Router } from "angular2/router";

import { DateTransform } from '../shared/date.transform.pipe';
import { Job } from '../shared/job.ts';
import { JobService } from '../shared/job.service';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'rb-admin-main',
    template: `
        <h1>My profile</h1>
        <div>
        <button type="button" class="btn btn-primary" (click)="editMyProfile()">Edit My Profile</button>
        <button type="button" class="btn btn-danger" (click)="deleteMyProfile()">Delete My Profile</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Job Title</th><th>Job Description</th><th>Job Posted Date</th>
                    <th>Job End Date</th><th>Apply To Jobs</th>
                </tr>
            </thead>
            <tbody *ngFor="#job of jobs">
                <tr>
                    <td>{{ job.jobTitle }}</td>
                    <td>{{ job.jobDescription }}</td>
                    <td>{{ job.jobPostedDate | datetransform | date }}</td>
                    <td>{{ job.jobEndDate | datetransform | date }}</td>
                    <td><button type="button" class="btn btn-info" (click)="jobApply(job)">Apply</button></td>
                </tr>
            </tbody>
        </table>
    `,
    providers: [JobService, UserService],
    pipes: [DateTransform]
})

export class ApplicantMainComponent {

    public jobs: Job[];
    public jobId: string;

    constructor(public jobService: JobService, public router: Router,
                public userService: UserService) { 

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

    public jobApply(job: Job) {
        let userId = + localStorage.getItem('userId');
        console.log(job.jobId, userId);
        this.userService.addJob(userId, job.jobId)
        .subscribe(
            error => console.log(error)
        );
    }

    public editMyProfile() {
        let userId = localStorage.getItem('userId');
        this.router.navigate(['Add', {id: userId}]);
    }

    public deleteMyProfile() {
        this.userService.deleteUser()
        .subscribe(
            data => {
                console.log(data),
                localStorage.clear(),
                this.router.navigate(['Start']);
            },
            error => console.log(error)
        );
    }
}