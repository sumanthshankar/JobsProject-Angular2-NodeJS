import { Component, OnInit } from 'angular2/core';
import { Router } from "angular2/router";
import { FormBuilder, 
         ControlGroup, 
         Validators, 
         Control
       } from 'angular2/common';

import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.ts';

@Component({
    selector: 'rb-admin',
    template: `
    <h1>For Administrators Only</h1>
    <h1><small>Enter your Email Id and password to log in</small></h1>
     <form [ngFormModel]="adminLoginForm">
        <div class="form-group">
            <label for="emailId">Email Id</label>
            <input 
             type="text" 
             placeholder="Enter your Email Id"
             class="form-control" 
             id="emailId"
             [ngFormControl]="adminLoginForm.find('emailId')">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input 
             type="password" 
             placeholder="Enter your Password"
             class="form-control" 
             id="password" 
             [ngFormControl]="adminLoginForm.find('password')">
        </div>
    </form>
    <button type="button" class="btn btn-info" 
            [disabled]="!adminLoginForm.valid" 
            (click)="adminLoginFormSubmit()">Login</button>
    `,
    providers: [AuthService]
})

export class AdminComponent implements OnInit {
    adminLoginForm: ControlGroup;

    constructor(private formBuilder: FormBuilder, public authService: AuthService, public router: Router) { 

    }

    ngOnInit() {
        this.adminLoginForm = this.formBuilder.group({
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

    public adminLoginFormSubmit() {
        const user = new User(this.adminLoginForm.value.emailId, this.adminLoginForm.value.password);
        this.authService.adminLogin(user)
        .subscribe(
            data => {
                localStorage.setItem('token', data.token),
                localStorage.setItem('userId', data.userId)
                this.router.navigate(['AdminMain']);
            },
            error => console.log(error)
        );
    }
    
}