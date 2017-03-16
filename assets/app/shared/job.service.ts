import { Http, Headers } from 'angular2/http';
import { Injectable, EventEmitter } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Job } from './job';

@Injectable()
export class JobService {

    jobs: Job[] = [];

    job: Job;

    constructor(public http: Http) {

    }

    getJobs() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/job/all-jobs' + token)
        .map(response => {
            const getJobs = response.json().jobs;
            let jobObjects: any[] = [];
            for(let i = 0; i < getJobs.length; i ++) {
                let jobs = new Job(getJobs[i].job_title, getJobs[i].job_description, 
                                   getJobs[i].job_end_date, getJobs[i].job_posted_date,
                                   getJobs[i].job_id);
                jobObjects.push(jobs);
            };
            return jobObjects;
        })
        .catch(error => Observable.throw(error.json()));
    }

    getJob(jobId: number) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/job/single-job/' + jobId + token)
        .map(response => {
            const getJob = response.json().job;
            let job = new Job(getJob[0].job_title, getJob[0].job_description, 
                                   getJob[0].job_end_date, getJob[0].job_posted_date,
                                   getJob[0].job_id);
            return job;

        })
        .catch(error => Observable.throw(error.json()));
    }

    addJob(job: Job) {
        const body = JSON.stringify(job);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/job/post-job/' + token, body, {headers: headers})
        .map(response => {
            response.json();
                const getJob = response.json().obj;
                let job = new Job(getJob.jobTitle, getJob.jobDescription, 
                                   getJob.jobEndDate, getJob.jobPostedDate,
                                   getJob.jobId);
                return job;
                }
            )
            .catch(error => Observable.throw(error.json()));
    }

    editJob(jobId: number, job: Job) {
        const body = JSON.stringify(job);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.put('http://localhost:3000/job/edit-job/' + jobId + token, body, {headers: headers})
        .map(response => response.json() )
        .catch(error => Observable.throw(error.json()));
    }

    deleteJob(job: Job) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/job/delete-job/' + job.jobId + token)
        .map(response => {
            response.json(),
            this.jobs.splice(this.jobs.indexOf(job), 1)
        })
        .catch(error => Observable.throw(error.json()));
    }
}