import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from "angular2/router";
import { FormBuilder, 
         ControlGroup, 
         Validators,
         Control
       } from 'angular2/common';

import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.ts';

@Component({
    selector: 'rb-applicant',
    template: `
     <h1>For Applicants</h1>
     <h1><small>Enter your Email Id and password to log in</small></h1>
     <form [ngFormModel]="applicantLoginForm">
        <div class="form-group">
            <label for="emailId">Email Id</label>
            <input 
             type="text"
             placeholder="Enter your Email Id" 
             class="form-control" 
             id="emailId" 
             [ngFormControl]="applicantLoginForm.find('emailId')">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input 
             type="password" 
             placeholder="Enter your Password"
             class="form-control" 
             id="password" 
             [ngFormControl]="applicantLoginForm.find('password')">
        </div>
    </form>
    <button type="button" class="btn btn-info" 
            [disabled]="!applicantLoginForm.valid" 
            (click)="applicantLoginFormSubmit()">Login</button>
    `
})

export class ApplicantComponent implements OnInit {

    applicantLoginForm: ControlGroup;

    constructor(private formBuilder: FormBuilder, public authService: AuthService, public router: Router) { 

    }

    ngOnInit() {
        this.applicantLoginForm = this.formBuilder.group({
            'emailId': ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            'password': ['', Validators.required]
        });
    }

    private isEmail(control: Control): {[s1: string]: boolean} {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return {invalidMail: true};
        }
    }

    public applicantLoginFormSubmit() {
        const user = new User(this.applicantLoginForm.value.emailId, this.applicantLoginForm.value.password);
        this.authService.applicantLogin(user)
        .subscribe(
            data => {
                localStorage.setItem('token', data.token),
                localStorage.setItem('userId', data.userId)
                this.router.navigate(['ApplicantMain']);
            },
            error => console.log(error)
        );
    }
    
}