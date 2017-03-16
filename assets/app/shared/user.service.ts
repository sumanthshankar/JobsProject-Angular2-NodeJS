import { Http, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from './user';
import { Job } from './job';

@Injectable()
export class UserService {
    
    public users: User[] = [];

    public job: Job[] = [];

    constructor(public http: Http) {

    }

    addUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        return this.http.post('http://localhost:3000/applicant/add-new-user', body, {headers: headers})
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    getUsersByJobId(jobId: string) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/applicant/all-applicants/' + jobId + token)
        .map(response => {
            const getUsers = response.json().obj;
            let userObjects: any[] = [];
            for(let i = 0; i < getUsers.length; i++){
                let users = new User(getUsers[i].emailId, getUsers[i].password, getUsers[i].firstName,
                                     getUsers[i].lastName, getUsers[i]._id);
                userObjects.push(users);
            }
            return userObjects
        })
        .catch(error => Observable.throw(error.json()));
    }

    getUsers() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/applicant/all-users/' + token)
        .map(response => {
            const getUsers = response.json().userObjs;
            let userObjects: any[] = [];
            for(let i = 0; i < getUsers.length; i++){
                let users = new User(null, null, getUsers[i].firstName,
                                     getUsers[i].lastName, getUsers[i].userId, null, null);
                userObjects.push(users);
            }
            return userObjects
        })
        .catch(error => Observable.throw(error.json()));
    }

    getUserById(userId: number) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/applicant/user-by-id/' + userId + token)
        .map(response => {
            const getUserObject = response.json().userObj;
            this.job = getUserObject.jobs;
            console.log(getUserObject);
            console.log(getUserObject.jobs);
            let userObject = new User(getUserObject.emailId, getUserObject.password, getUserObject.firstName,
                                      getUserObject.lastName, null, getUserObject.educationProfile,
                                      getUserObject.educationProfile);
            return userObject;
        })
        .catch(error => Observable.throw(error.json()));
    }

    getUserByIdJobs(userId: number) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/applicant/admin/user-by-id/' + userId + token)
        .map(response => {
            const getUserObject = response.json().userObj;
            this.job = getUserObject.appliedJobs;
            console.log(this.job);
            let userObject = new User(getUserObject.emailId, getUserObject.password, getUserObject.firstName,
                                      getUserObject.lastName, null, getUserObject.educationProfile,
                                      getUserObject.appliedJobs);
            return userObject;
        })
        .catch(error => Observable.throw(error.json()));
    }

    editUser(userId: number, user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.put('http://localhost:3000/applicant/edit-profile/' + userId + token, body, {headers: headers})
        .map(response => response.json() )
        .catch(error => Observable.throw(error.json()));
    }

    deleteUser() {
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/applicant/delete-profile/' + token, {headers: headers})
        .map(response => response.json() )
        .catch(error => Observable.throw(error.json()));
    }

    addJob(userId: number, jobId: number) {
        const headers = new Headers({
            'Content-type': 'application/json'
        });
        const body = JSON.stringify({'userId': userId, 'jobId': jobId});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/job/add-job/' + token, body, {headers: headers})
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    userJobDelete(userId: number, jobId: number) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/job/delete-applicant-job/' + userId + '/' + jobId + '/' + token)
        .map(response => {
            const getUserObject = response.json().obj;
            for(var i = this.job.length-1; i>=0; i--) {
                if( this.job[i].jobId === getUserObject) this.job.splice(i,1);
            }
            return getUserObject;
        })
        .catch(error => Observable.throw(error.json()));
    }

}