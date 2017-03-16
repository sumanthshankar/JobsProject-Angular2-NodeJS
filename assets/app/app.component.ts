import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { HeaderComponent } from './header.component';
import { StartComponent } from './start.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMainComponent } from './admin/admin.main.component';
import { ApplicantMainComponent } from './applicant/applicant.main.component';
import { ViewApplicantComponent } from './admin/view.applicant.component';
import { ApplicantCompleteProfile } from './admin/applicant.complete.profile.component';
import { ViewRegisteredUsersComponent } from './admin/view.registered.users.component';
import { PostEditJobComponent } from './admin/post.edit.job.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { AddEditApplicantComponent } from './applicant/add.edit.applicant.component';
import { UserService } from './shared/user.service';

@Component({
    selector: 'rb-app',
    template: `  
        <my-header></my-header>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [HeaderComponent, ROUTER_DIRECTIVES],
    providers: [UserService]
})

@RouteConfig([
    { path:'/', name: 'Start', component: StartComponent, useAsDefault: true },
    { path: 'login/admin-login', name: 'Admin', component: AdminComponent },
    { path: 'jobs', name: 'AdminMain', component: AdminMainComponent },
    { path: 'view-registered-users', name: 'RegisteredUsers', component: ViewRegisteredUsersComponent },
    { path: 'jobs/view-applicant', name: 'ViewApplicant', component: ViewApplicantComponent },
    { path: 'jobs/view-applicant/', name: 'CompleteProfile', component: ApplicantCompleteProfile },
    { path: 'job', name: 'PostEditJob', component: PostEditJobComponent },
    { path: 'job/:id', name: 'PostEditJob', component: PostEditJobComponent },
    { path: 'login/applicant-login', name: 'Applicant', component: ApplicantComponent },
    { path: 'login/applicant-login/my-profile', name: 'ApplicantMain', component: ApplicantMainComponent },
    { path: '/add-applicant', name: 'Add', component: AddEditApplicantComponent }
])

export class AppComponent {

}