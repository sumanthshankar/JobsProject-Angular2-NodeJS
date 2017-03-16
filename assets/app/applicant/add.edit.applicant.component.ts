import { Component, OnInit, OnDestroy } from 'angular2/core';
import { RouteParams, Router } from "angular2/router";
import { Subscription, Observable } from 'rxjs/RX';
import 'rxjs/Rx';
import { FormBuilder, 
         ControlGroup, 
         Validators, 
         Control, 
         ControlArray
       } from 'angular2/common';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.ts';
import { Education } from '../shared/education.ts';


@Component({
    selector: 'rb-new-applicant',
    template: `
    <form [ngFormModel]="singupForm">
            <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input 
                     placeholder="Enter your First Name"
                     type="text" 
                     id="firstName" 
                     class="form-control"
                     [ngFormControl]="singupForm.find('firstName')">
                <div *ngIf="!singupForm.find('firstName').valid && singupForm.find('firstName').touched">Your First Name is required!</div>     
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input 
                     placeholder="Enter your Last Name" 
                     type="text" id="lastName" 
                     class="form-control"
                     [ngFormControl]="singupForm.find('lastName')">
                <div *ngIf="!singupForm.find('lastName').valid && singupForm.find('lastName').touched">Your Last Name is required!</div>
                </div>
                <div class="form-group">
                    <label for="email">E-Mail</label>
                    <input
                     placeholder="Enter your E-Mail Id"
                     type="email" 
                     id="email" 
                     class="form-control"
                     [ngFormControl]="singupForm.find('emailId')"
                     [disabled]="!isNew" >
                <div *ngIf="!singupForm.find('emailId').valid && singupForm.find('emailId').touched">Your valid E-Mail Id is required!</div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input  
                     placeholder="Enter your Password"
                     type="password" 
                     id="password" 
                     class="form-control"
                     [ngFormControl]="singupForm.find('password')">
                <div *ngIf="!singupForm.find('password').valid && singupForm.find('password').touched">Your must enter a password!</div>
                </div>
                <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input 
                     placeholder="Confirm your Password"
                     type="password" 
                     id="password" 
                     class="form-control"
                     [ngFormControl]="singupForm.find('confirmPassword')">
                </div>     
                <div *ngIf="!singupForm.find('confirmPassword').valid && singupForm.find('confirmPassword').touched">Your must confirm your password!</div>
                <div *ngFor="#degree of degrees.controls; #i = index">
                    <label>Your Education: {{i+1}}</label>
                    <div class="row">
                    <div class="form-group">
                        <div class="col-xs-3">
                        <label>Major</label>
                        <input type="text" placeholder="Enter you Major" [ngFormControl]="degree.controls.major"/>
                        </div>
                        <div class="col-xs-3">
                        <label>University</label>
                        <input type="text" placeholder="Enter you University" [ngFormControl]="degree.controls.university"/>
                        </div>
                        <div class="col-xs-3">
                        <label>Year</label>
                        <input type="text" placeholder="Enter Year" [ngFormControl]="degree.controls.year"/>
                        </div>
                        <div class="col-sm-2">
                            <button class="btn btn-danger" (click)="deleteDegree(i)">Delete Degree</button>
                        </div>
                    </div>
                    </div>
                    <hr>
                </div>
        </form>
        <button type="button" class="btn btn-success" (click)="addDegree()">Add New Degree</button>
        <hr>
        <button type="submit" class="btn btn-primary" *ngIf="isNew" [disabled]="!singupForm.valid" (click)="singupFormSubmit(singupForm.value)">Sign Up</button>
        <button type="submit" class="btn btn-primary" *ngIf="!isNew" [disabled]="!singupForm.valid" (click)="singupFormSave(singupForm.value)">Save</button>
        <button type="submit" class="btn btn-danger" *ngIf="!isNew" (click)="saveCancel()">Cancel</button>
    `,
    providers: [UserService]
})

export class AddEditApplicantComponent implements OnInit {

    singupForm: ControlGroup;
    degrees: ControlArray = new ControlArray([]);
    private subscription: Subscription;
    private education: Education[] = [];
    public isNew: boolean = true;
    public userId: number = 0;

    constructor(private formBuilder: FormBuilder, public userService: UserService, 
                public routeParams: RouteParams, public router: Router) { 
        this.initilizeForm(null);
    }

    ngOnInit() {
        this.userId = + this.routeParams.get('id');
        if(this.userId !== 0) {
            this.isNew = false;
            this.userService.getUserById(this.userId)
            .subscribe( data => {
                                this.initilizeForm(data)
                            },
                            error => console.log(error)
                    );
        } else {
            this.isNew = true;
        }

    }
    
    public initilizeForm(user: User) {
        let userFirstName;
        let userLastName;
        let userEmailId;
        let userEducationProfile: ControlArray = new ControlArray([]);
        if(!this.isNew) {
            for(let i = 0; i < user.educationProfile.length; i++) {
                this.degrees.push(
                    new ControlGroup({
                        'major': new Control(user.educationProfile[i].major, Validators.required),
                        'university': new Control(user.educationProfile[i].university, Validators.required),
                        'year': new Control(user.educationProfile[i].year, Validators.required)
                    })
                );
            }
            userFirstName = user.firstName;
            userLastName = user.lastName;
            userEmailId = user.emailId;
        }
        this.singupForm = this.formBuilder.group({
                firstName: [userFirstName, Validators.required],
                lastName: [userLastName, Validators.required],
                emailId: [userEmailId, Validators.compose([
                    Validators.required
                    //this.isEmail
                    // error is ther on isEmail method
                ])],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
                degrees: this.degrees
            }, {validator: this.matchPasswords('password', 'confirmPassword')} );
        }

    private isEmail(control: Control): {[s1: string]: boolean} {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return {invalidMail: true};
        }
    }

    private uniqueEmailValidator(control: Control): Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, reject) => {

            }
        );
    }

    private matchPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: ControlGroup) => {
        let passwordInput = group.controls[passwordKey];
        let passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
        }
    }
    
    addDegree() {
        this.degrees.push(
            new ControlGroup({
                'major': new Control('', Validators.required),
                'university': new Control('', Validators.required),
                'year': new Control('', Validators.required)
            })
        );
    }

    deleteDegree(index: number) {
        this.degrees.removeAt(index);
    }

    saveCancel() {
        this.router.navigate(['ApplicantMain']);
    }

    public singupFormSubmit() {
        for(let i = 0; i < this.singupForm.value.degrees.length; i ++){
            this.education.push(new Education(this.singupForm.value.degrees[i].major,
                                              this.singupForm.value.degrees[i].university,
                                              this.singupForm.value.degrees[i].year));
        }
        const user = new User(this.singupForm.value.emailId, this.singupForm.value.password,
                              this.singupForm.value.firstName, this.singupForm.value.lastName, 
                              null, this.singupForm.value.degrees, null);
        this.userService.addUser(user)
        .subscribe(
            data => {
                this.router.navigate(['Start']);
            },
            error => console.log(error)
        );
    }

    public singupFormSave() {
        for(let i = 0; i < this.singupForm.value.degrees.length; i ++){
            this.education.push(new Education(this.singupForm.value.degrees[i].major,
                                              this.singupForm.value.degrees[i].university,
                                              this.singupForm.value.degrees[i].year));
        }
        const user = new User(this.singupForm.value.emailId, this.singupForm.value.password,
                              this.singupForm.value.firstName, this.singupForm.value.lastName, 
                              null, this.singupForm.value.degrees, null);
        this.userService.editUser(this.userId, user)
        .subscribe(
            error => console.log(error)
        );
    }

}