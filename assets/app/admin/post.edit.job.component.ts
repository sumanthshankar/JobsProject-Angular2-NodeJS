import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from "angular2/router";
import { FormBuilder, 
         ControlGroup, 
         Validators, 
         Control, 
         ControlArray
       } from 'angular2/common';

import { Job } from '../shared/job';
import { JobService } from '../shared/job.service';

@Component({
    selector: 'rb-post-jobs',
    template: `
        <form [ngFormModel]="jobForm">
                <div class="form-group">
                    <label for="jobTitle">Job Title</label>
                    <input type="text"
                           placeholder="Enter a Job Title" 
                           class="form-control" 
                           id="jobTitle"
                           [ngFormControl]="jobForm.find('jobTitle')">
                    <label for="jobEndDate">Job Application End Date</label>
                    <input type="date" 
                           class="form-control" 
                           id="jobEndDate"
                           [ngFormControl]="jobForm.find('jobEndDate')">
                    <label for="jobDescription">A brief Description about the job:</label>
                    <textarea 
                     class="form-control" 
                     rows="5" 
                     id="jobDescription"
                     [ngFormControl]="jobForm.find('jobDescription')"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" *ngIf="isNew" [disabled]="!jobForm.valid" (click)="jobFormSubmit()">Post</button>
                <button type="submit" class="btn btn-primary" *ngIf="!isNew" [disabled]="!jobForm.valid" (click)="jobFormSubmit()">Save</button>
                <button type="button" class="btn btn-danger" (click)="onCancel()">Cancel</button>
            </form>
    `,
    providers: [JobService]
})

export class PostEditJobComponent implements OnInit {

    jobForm: ControlGroup;
    public jobId: number;
    public isNew: boolean = true;
    public jobDate: Date;
    
    constructor(private formBuilder: FormBuilder, public jobService: JobService, 
                public router: Router, public routeParams: RouteParams) { 
                    this.initilizeForm(null);
    }

    ngOnInit() { 
        if(this.routeParams.get('id')) {
            this.jobId = + this.routeParams.get('id');
            this.isNew = false;
            this.jobService.getJob(this.jobId)
                            .subscribe( data => {
                                this.initilizeForm(data)
                            },
                            error => console.log(error)
                    );
        } else {
            this.isNew = true;
        }
    }

    public initilizeForm(job: Job) {
        let jobTitle;
        let jobDescription;
        let jobEndDate: any;

        if(!this.isNew) {
            jobTitle = job.jobTitle
            console.log(jobTitle);
            jobDescription = job.jobDescription;
            jobEndDate = job.jobEndDate;
            
            let customDay: any;
            let customMonth: any;
            let customDate = new Date(jobEndDate);

            customDay = customDate.getDate();
            if(customDay <= 9) {
            customDay = '0' + customDay;
            } else {
                customDay;
            }

            customMonth = (customDate.getMonth()+1);
            if(customMonth <= 9) {
            customMonth = '0' + customMonth;
            } else {
                customMonth;
            }
            jobEndDate = customDate.getFullYear() + "-" + customMonth + "-" + customDay;
        }

        this.jobForm = this.formBuilder.group({
            jobTitle: [jobTitle, Validators.required],
            jobEndDate: [jobEndDate, Validators.required],
            jobDescription: [jobDescription, Validators.required]
        });

    }

    jobFormSubmit() {
        if(this.isNew) {
            const job = new Job(this.jobForm.value.jobTitle, this.jobForm.value.jobDescription,
                            this.jobForm.value.jobEndDate);
        this.jobService.addJob(job)
        .subscribe(
            data => {
                this.jobService.jobs.push(data);
                this.router.navigate(['AdminMain']);
            },
            error => console.log(error)
        );
        }
        else {
            this.jobService.editJob(this.jobId, this.jobForm.value)
                .subscribe(
                    data => {
                        this.jobService.jobs.push(data);
                        this.router.navigate(['AdminMain']);
                    },
                    error => console.log(error)
                );
        }
    }

    public onCancel() {
        this.router.navigate(['AdminMain']);
    }

}