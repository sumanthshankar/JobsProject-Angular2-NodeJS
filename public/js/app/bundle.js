var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("shared/job", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Job;
    return {
        setters:[],
        execute: function() {
            Job = (function () {
                function Job(jobTitle, jobDescription, jobEndDate, jobPostedDate, jobId, jobApplied) {
                    this.jobTitle = jobTitle;
                    this.jobDescription = jobDescription;
                    this.jobEndDate = jobEndDate;
                    this.jobPostedDate = jobPostedDate;
                    this.jobId = jobId;
                    this.jobApplied = jobApplied;
                }
                return Job;
            }());
            exports_1("Job", Job);
        }
    }
});
System.register("shared/education", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Education;
    return {
        setters:[],
        execute: function() {
            Education = (function () {
                function Education(major, university, year) {
                    this.major = major;
                    this.university = university;
                    this.year = year;
                }
                return Education;
            }());
            exports_2("Education", Education);
        }
    }
});
System.register("shared/user", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(emailId, password, firstName, lastName, userId, educationProfile, appliedJobs) {
                    this.emailId = emailId;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.userId = userId;
                    this.educationProfile = educationProfile;
                    this.appliedJobs = appliedJobs;
                }
                return User;
            }());
            exports_3("User", User);
        }
    }
});
System.register("shared/auth.service", ['angular2/http', 'angular2/core', 'rxjs/Observable', 'rxjs/Rx'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var http_1, core_1, Observable_1;
    var AuthService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(http) {
                    this.http = http;
                }
                AuthService.prototype.adminLogin = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_1.Headers({
                        'Content-type': 'application/json'
                    });
                    return this.http.post('http://localhost:3000/login/admin-login', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                AuthService.prototype.applicantLogin = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_1.Headers({
                        'Content-type': 'application/json'
                    });
                    return this.http.post('http://localhost:3000/login/applicant-login', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                AuthService.prototype.logout = function () {
                    localStorage.clear();
                };
                AuthService.prototype.isLoggedIn = function () {
                    return localStorage.getItem('token') !== null;
                };
                AuthService.prototype.isAuthenticated = function () {
                    if (localStorage.getItem('token') !== null) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                AuthService.prototype.adminAdd = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_1.Headers({
                        'Content-type': 'application/json'
                    });
                    return this.http.post('http://localhost:3000/login/add-admin', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_4("AuthService", AuthService);
        }
    }
});
System.register("header.component", ['angular2/core', "angular2/router", "shared/auth.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_2, router_1, auth_service_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(authService, router) {
                    this.authService = authService;
                    this.router = router;
                }
                HeaderComponent.prototype.isLoggedIn = function () {
                    return this.authService.isLoggedIn();
                };
                HeaderComponent.prototype.logout = function () {
                    this.authService.logout();
                    this.router.navigate(['Start']);
                };
                HeaderComponent = __decorate([
                    core_2.Component({
                        selector: 'my-header',
                        template: "\n        <nav class=\"navbar navbar-default\">\n        <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <a [routerLink]=\"['Start']\" class=\"navbar-brand\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span></a>\n        </div>\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n            <li><a [routerLink]=\"['Admin']\" *ngIf=\"!isLoggedIn()\">Administrators <span class=\"glyphicon glyphicon-log-in\" aria-hidden=\"true\"></span></a></li>\n            <li><a [routerLink]=\"['Applicant']\" *ngIf=\"!isLoggedIn()\">Applicants <span class=\"glyphicon glyphicon-log-in\" aria-hidden=\"true\"></span></a></li>\n            <li><a [routerLink]=\"['Add']\" *ngIf=\"!isLoggedIn()\">New Applicants <span class=\"glyphicon glyphicon-log-in\" aria-hidden=\"true\"></span></a></li>\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\">\n            <li><a (click)=\"logout()\" *ngIf=\"isLoggedIn()\">Logout <span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span></a></li>\n        </ul>\n        </div>\n        </div>\n    </nav>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_5("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("start.component", ['angular2/core'], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_3;
    var StartComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            }],
        execute: function() {
            StartComponent = (function () {
                function StartComponent() {
                }
                StartComponent = __decorate([
                    core_3.Component({
                        selector: 'rb-start',
                        template: "\n    <div class=\"page-header\">\n        <h1>Welcome to Jobs Profile</h1>\n        <h1><small>Click on appropriate links to continue</small></h1>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], StartComponent);
                return StartComponent;
            }());
            exports_6("StartComponent", StartComponent);
        }
    }
});
System.register("admin/admin.component", ['angular2/core', "angular2/router", 'angular2/common', "shared/auth.service", "shared/user"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_4, router_2, common_1, auth_service_2, user_ts_1;
    var AdminComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            },
            function (user_ts_1_1) {
                user_ts_1 = user_ts_1_1;
            }],
        execute: function() {
            AdminComponent = (function () {
                function AdminComponent(formBuilder, authService, router) {
                    this.formBuilder = formBuilder;
                    this.authService = authService;
                    this.router = router;
                }
                AdminComponent.prototype.ngOnInit = function () {
                    this.adminLoginForm = this.formBuilder.group({
                        'emailId': ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                this.isEmail
                            ])],
                        'password': ['', common_1.Validators.required]
                    });
                };
                AdminComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                AdminComponent.prototype.adminLoginFormSubmit = function () {
                    var _this = this;
                    var user = new user_ts_1.User(this.adminLoginForm.value.emailId, this.adminLoginForm.value.password);
                    this.authService.adminLogin(user)
                        .subscribe(function (data) {
                        localStorage.setItem('token', data.token),
                            localStorage.setItem('userId', data.userId);
                        _this.router.navigate(['AdminMain']);
                    }, function (error) { return console.log(error); });
                };
                AdminComponent = __decorate([
                    core_4.Component({
                        selector: 'rb-admin',
                        template: "\n    <h1>For Administrators Only</h1>\n    <h1><small>Enter your Email Id and password to log in</small></h1>\n     <form [ngFormModel]=\"adminLoginForm\">\n        <div class=\"form-group\">\n            <label for=\"emailId\">Email Id</label>\n            <input \n             type=\"text\" \n             placeholder=\"Enter your Email Id\"\n             class=\"form-control\" \n             id=\"emailId\"\n             [ngFormControl]=\"adminLoginForm.find('emailId')\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <input \n             type=\"password\" \n             placeholder=\"Enter your Password\"\n             class=\"form-control\" \n             id=\"password\" \n             [ngFormControl]=\"adminLoginForm.find('password')\">\n        </div>\n    </form>\n    <button type=\"button\" class=\"btn btn-info\" \n            [disabled]=\"!adminLoginForm.valid\" \n            (click)=\"adminLoginFormSubmit()\">Login</button>\n    ",
                        providers: [auth_service_2.AuthService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_2.AuthService, router_2.Router])
                ], AdminComponent);
                return AdminComponent;
            }());
            exports_7("AdminComponent", AdminComponent);
        }
    }
});
System.register("shared/job.service", ['angular2/http', 'angular2/core', 'rxjs/Observable', 'rxjs/Rx', "shared/job"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var http_2, core_5, Observable_2, job_1;
    var JobService;
    return {
        setters:[
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            },
            function (_2) {},
            function (job_1_1) {
                job_1 = job_1_1;
            }],
        execute: function() {
            JobService = (function () {
                function JobService(http) {
                    this.http = http;
                    this.jobs = [];
                }
                JobService.prototype.getJobs = function () {
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.get('http://localhost:3000/job/all-jobs' + token)
                        .map(function (response) {
                        var getJobs = response.json().jobs;
                        var jobObjects = [];
                        for (var i = 0; i < getJobs.length; i++) {
                            var jobs = new job_1.Job(getJobs[i].job_title, getJobs[i].job_description, getJobs[i].job_end_date, getJobs[i].job_posted_date, getJobs[i].job_id);
                            jobObjects.push(jobs);
                        }
                        ;
                        return jobObjects;
                    })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                JobService.prototype.getJob = function (jobId) {
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.get('http://localhost:3000/job/single-job/' + jobId + token)
                        .map(function (response) {
                        var getJob = response.json().job;
                        var job = new job_1.Job(getJob[0].job_title, getJob[0].job_description, getJob[0].job_end_date, getJob[0].job_posted_date, getJob[0].job_id);
                        return job;
                    })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                JobService.prototype.addJob = function (job) {
                    var body = JSON.stringify(job);
                    var headers = new http_2.Headers({
                        'Content-type': 'application/json'
                    });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.post('http://localhost:3000/job/post-job/' + token, body, { headers: headers })
                        .map(function (response) {
                        response.json();
                        var getJob = response.json().obj;
                        var job = new job_1.Job(getJob.jobTitle, getJob.jobDescription, getJob.jobEndDate, getJob.jobPostedDate, getJob.jobId);
                        return job;
                    })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                JobService.prototype.editJob = function (jobId, job) {
                    var body = JSON.stringify(job);
                    var headers = new http_2.Headers({
                        'Content-type': 'application/json'
                    });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.put('http://localhost:3000/job/edit-job/' + jobId + token, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                JobService.prototype.deleteJob = function (job) {
                    var _this = this;
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.delete('http://localhost:3000/job/delete-job/' + job.jobId + token)
                        .map(function (response) {
                        response.json(),
                            _this.jobs.splice(_this.jobs.indexOf(job), 1);
                    })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                JobService = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [http_2.Http])
                ], JobService);
                return JobService;
            }());
            exports_8("JobService", JobService);
        }
    }
});
System.register("admin/post.edit.job.component", ['angular2/core', "angular2/router", 'angular2/common', "shared/job", "shared/job.service"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_6, router_3, common_2, job_2, job_service_1;
    var PostEditJobComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (job_2_1) {
                job_2 = job_2_1;
            },
            function (job_service_1_1) {
                job_service_1 = job_service_1_1;
            }],
        execute: function() {
            PostEditJobComponent = (function () {
                function PostEditJobComponent(formBuilder, jobService, router, routeParams) {
                    this.formBuilder = formBuilder;
                    this.jobService = jobService;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.isNew = true;
                    this.initilizeForm(null);
                }
                PostEditJobComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.routeParams.get('id')) {
                        this.jobId = +this.routeParams.get('id');
                        this.isNew = false;
                        this.jobService.getJob(this.jobId)
                            .subscribe(function (data) {
                            _this.initilizeForm(data);
                        }, function (error) { return console.log(error); });
                    }
                    else {
                        this.isNew = true;
                    }
                };
                PostEditJobComponent.prototype.initilizeForm = function (job) {
                    var jobTitle;
                    var jobDescription;
                    var jobEndDate;
                    if (!this.isNew) {
                        jobTitle = job.jobTitle;
                        console.log(jobTitle);
                        jobDescription = job.jobDescription;
                        jobEndDate = job.jobEndDate;
                        var customDay = void 0;
                        var customMonth = void 0;
                        var customDate = new Date(jobEndDate);
                        customDay = customDate.getDate();
                        if (customDay <= 9) {
                            customDay = '0' + customDay;
                        }
                        else {
                            customDay;
                        }
                        customMonth = (customDate.getMonth() + 1);
                        if (customMonth <= 9) {
                            customMonth = '0' + customMonth;
                        }
                        else {
                            customMonth;
                        }
                        jobEndDate = customDate.getFullYear() + "-" + customMonth + "-" + customDay;
                    }
                    this.jobForm = this.formBuilder.group({
                        jobTitle: [jobTitle, common_2.Validators.required],
                        jobEndDate: [jobEndDate, common_2.Validators.required],
                        jobDescription: [jobDescription, common_2.Validators.required]
                    });
                };
                PostEditJobComponent.prototype.jobFormSubmit = function () {
                    var _this = this;
                    if (this.isNew) {
                        var job = new job_2.Job(this.jobForm.value.jobTitle, this.jobForm.value.jobDescription, this.jobForm.value.jobEndDate);
                        this.jobService.addJob(job)
                            .subscribe(function (data) {
                            _this.jobService.jobs.push(data);
                            _this.router.navigate(['AdminMain']);
                        }, function (error) { return console.log(error); });
                    }
                    else {
                        this.jobService.editJob(this.jobId, this.jobForm.value)
                            .subscribe(function (data) {
                            _this.jobService.jobs.push(data);
                            _this.router.navigate(['AdminMain']);
                        }, function (error) { return console.log(error); });
                    }
                };
                PostEditJobComponent.prototype.onCancel = function () {
                    this.router.navigate(['AdminMain']);
                };
                PostEditJobComponent = __decorate([
                    core_6.Component({
                        selector: 'rb-post-jobs',
                        template: "\n        <form [ngFormModel]=\"jobForm\">\n                <div class=\"form-group\">\n                    <label for=\"jobTitle\">Job Title</label>\n                    <input type=\"text\"\n                           placeholder=\"Enter a Job Title\" \n                           class=\"form-control\" \n                           id=\"jobTitle\"\n                           [ngFormControl]=\"jobForm.find('jobTitle')\">\n                    <label for=\"jobEndDate\">Job Application End Date</label>\n                    <input type=\"date\" \n                           class=\"form-control\" \n                           id=\"jobEndDate\"\n                           [ngFormControl]=\"jobForm.find('jobEndDate')\">\n                    <label for=\"jobDescription\">A brief Description about the job:</label>\n                    <textarea \n                     class=\"form-control\" \n                     rows=\"5\" \n                     id=\"jobDescription\"\n                     [ngFormControl]=\"jobForm.find('jobDescription')\"></textarea>\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" *ngIf=\"isNew\" [disabled]=\"!jobForm.valid\" (click)=\"jobFormSubmit()\">Post</button>\n                <button type=\"submit\" class=\"btn btn-primary\" *ngIf=\"!isNew\" [disabled]=\"!jobForm.valid\" (click)=\"jobFormSubmit()\">Save</button>\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"onCancel()\">Cancel</button>\n            </form>\n    ",
                        providers: [job_service_1.JobService]
                    }), 
                    __metadata('design:paramtypes', [common_2.FormBuilder, job_service_1.JobService, router_3.Router, router_3.RouteParams])
                ], PostEditJobComponent);
                return PostEditJobComponent;
            }());
            exports_9("PostEditJobComponent", PostEditJobComponent);
        }
    }
});
System.register("shared/user.service", ['angular2/http', 'angular2/core', 'rxjs/Observable', 'rxjs/Rx', "shared/user"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var http_3, core_7, Observable_3, user_1;
    var UserService;
    return {
        setters:[
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (Observable_3_1) {
                Observable_3 = Observable_3_1;
            },
            function (_3) {},
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                    this.users = [];
                    this.job = [];
                }
                UserService.prototype.addUser = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_3.Headers({
                        'Content-type': 'application/json'
                    });
                    return this.http.post('http://localhost:3000/applicant/add-new-user', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.getUsersByJobId = function (jobId) {
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.get('http://localhost:3000/applicant/all-applicants/' + jobId + token)
                        .map(function (response) {
                        var getUsers = response.json().obj;
                        var userObjects = [];
                        for (var i = 0; i < getUsers.length; i++) {
                            var users = new user_1.User(getUsers[i].emailId, getUsers[i].password, getUsers[i].firstName, getUsers[i].lastName, getUsers[i]._id);
                            userObjects.push(users);
                        }
                        return userObjects;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.getUsers = function () {
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.get('http://localhost:3000/applicant/all-users/' + token)
                        .map(function (response) {
                        var getUsers = response.json().userObjs;
                        var userObjects = [];
                        for (var i = 0; i < getUsers.length; i++) {
                            var users = new user_1.User(null, null, getUsers[i].firstName, getUsers[i].lastName, getUsers[i].userId, null, null);
                            userObjects.push(users);
                        }
                        return userObjects;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.getUserById = function (userId) {
                    var _this = this;
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.get('http://localhost:3000/applicant/user-by-id/' + userId + token)
                        .map(function (response) {
                        var getUserObject = response.json().userObj;
                        _this.job = getUserObject.jobs;
                        console.log(getUserObject);
                        console.log(getUserObject.jobs);
                        var userObject = new user_1.User(getUserObject.emailId, getUserObject.password, getUserObject.firstName, getUserObject.lastName, null, getUserObject.educationProfile, getUserObject.educationProfile);
                        return userObject;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.getUserByIdJobs = function (userId) {
                    var _this = this;
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.get('http://localhost:3000/applicant/admin/user-by-id/' + userId + token)
                        .map(function (response) {
                        var getUserObject = response.json().userObj;
                        _this.job = getUserObject.appliedJobs;
                        console.log(_this.job);
                        var userObject = new user_1.User(getUserObject.emailId, getUserObject.password, getUserObject.firstName, getUserObject.lastName, null, getUserObject.educationProfile, getUserObject.appliedJobs);
                        return userObject;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.editUser = function (userId, user) {
                    var body = JSON.stringify(user);
                    var headers = new http_3.Headers({
                        'Content-type': 'application/json'
                    });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.put('http://localhost:3000/applicant/edit-profile/' + userId + token, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.deleteUser = function () {
                    var headers = new http_3.Headers({
                        'Content-type': 'application/json'
                    });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.delete('http://localhost:3000/applicant/delete-profile/' + token, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.addJob = function (userId, jobId) {
                    var headers = new http_3.Headers({
                        'Content-type': 'application/json'
                    });
                    var body = JSON.stringify({ 'userId': userId, 'jobId': jobId });
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.post('http://localhost:3000/job/add-job/' + token, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService.prototype.userJobDelete = function (userId, jobId) {
                    var _this = this;
                    var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
                    return this.http.delete('http://localhost:3000/job/delete-applicant-job/' + userId + '/' + jobId + '/' + token)
                        .map(function (response) {
                        var getUserObject = response.json().obj;
                        for (var i = _this.job.length - 1; i >= 0; i--) {
                            if (_this.job[i].jobId === getUserObject)
                                _this.job.splice(i, 1);
                        }
                        return getUserObject;
                    })
                        .catch(function (error) { return Observable_3.Observable.throw(error.json()); });
                };
                UserService = __decorate([
                    core_7.Injectable(), 
                    __metadata('design:paramtypes', [http_3.Http])
                ], UserService);
                return UserService;
            }());
            exports_10("UserService", UserService);
        }
    }
});
System.register("admin/view.registered.users.component", ['angular2/core', "angular2/router", "shared/user.service"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_8, router_4, user_service_1;
    var ViewRegisteredUsersComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            ViewRegisteredUsersComponent = (function () {
                function ViewRegisteredUsersComponent(userService, router) {
                    this.userService = userService;
                    this.router = router;
                    this.users = [];
                }
                ViewRegisteredUsersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userService.getUsers()
                        .subscribe(function (users) {
                        _this.users = users,
                            _this.userService.users = users;
                    }, function (error) { return console.log(error); });
                };
                ViewRegisteredUsersComponent.prototype.userProfile = function (userId) {
                    this.router.navigate(['CompleteProfile', { id: userId }]);
                };
                ViewRegisteredUsersComponent = __decorate([
                    core_8.Component({
                        selector: 'rb-registered-users',
                        template: "\n    <ol class=\"breadcrumb\">\n            <li><a [routerLink]=\"['AdminMain']\">Home</a></li>\n            <li>Registered Users</li>\n        </ol>\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <a class=\"list-group-item clearfix\" *ngFor=\"#user of users\">\n                    <h4 (click)=\"userProfile(user.userId)\" class=\"list-group-item-heading\">{{ user.firstName }} {{ user.lastName }}</h4>\n                </a>\n            </div>   \n        </div>\n    ",
                        directives: [router_4.ROUTER_DIRECTIVES],
                        providers: [user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_4.Router])
                ], ViewRegisteredUsersComponent);
                return ViewRegisteredUsersComponent;
            }());
            exports_11("ViewRegisteredUsersComponent", ViewRegisteredUsersComponent);
        }
    }
});
System.register("admin/view.applicant.component", ['angular2/core', "angular2/router", "shared/user.service"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_9, router_5, user_service_2;
    var ViewApplicantComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (user_service_2_1) {
                user_service_2 = user_service_2_1;
            }],
        execute: function() {
            ViewApplicantComponent = (function () {
                function ViewApplicantComponent(userService, router, routeParams) {
                    this.userService = userService;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.users = [];
                }
                ViewApplicantComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.jobId = this.routeParams.get('id');
                    this.userService.getUsersByJobId(this.jobId)
                        .subscribe(function (users) {
                        _this.users = users,
                            _this.userService.users = users;
                    }, function (error) { return console.log(error); });
                };
                ViewApplicantComponent.prototype.userProfile = function (userId) {
                    this.router.navigate(['CompleteProfile', { id: userId }]);
                };
                ViewApplicantComponent = __decorate([
                    core_9.Component({
                        selector: 'rb-view-applicant',
                        template: "\n        <ol class=\"breadcrumb\">\n            <li><a [routerLink]=\"['AdminMain']\">Home</a></li>\n            <li>Job Applicants</li>\n        </ol>\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <a class=\"list-group-item clearfix\" *ngFor=\"#user of users\">\n                    <h4 (click)=\"userProfile(user._id)\" class=\"list-group-item-heading\">{{ user.firstName }} {{ user.lastName }}</h4>\n                </a>\n            </div>\n        </div>\n    ",
                        directives: [router_5.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [user_service_2.UserService, router_5.Router, router_5.RouteParams])
                ], ViewApplicantComponent);
                return ViewApplicantComponent;
            }());
            exports_12("ViewApplicantComponent", ViewApplicantComponent);
        }
    }
});
System.register("shared/date.transform.pipe", ['angular2/core'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_10;
    var DateTransform;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            }],
        execute: function() {
            DateTransform = (function () {
                function DateTransform() {
                }
                DateTransform.prototype.transform = function (value, args) {
                    var date = new Date(value);
                    return date;
                };
                DateTransform = __decorate([
                    core_10.Pipe({
                        name: 'datetransform'
                    }), 
                    __metadata('design:paramtypes', [])
                ], DateTransform);
                return DateTransform;
            }());
            exports_13("DateTransform", DateTransform);
        }
    }
});
System.register("admin/admin.main.component", ['angular2/core', "angular2/router", "shared/job.service", "admin/view.applicant.component", "shared/date.transform.pipe"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_11, router_6, job_service_2, view_applicant_component_1, date_transform_pipe_1;
    var AdminMainComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (job_service_2_1) {
                job_service_2 = job_service_2_1;
            },
            function (view_applicant_component_1_1) {
                view_applicant_component_1 = view_applicant_component_1_1;
            },
            function (date_transform_pipe_1_1) {
                date_transform_pipe_1 = date_transform_pipe_1_1;
            }],
        execute: function() {
            AdminMainComponent = (function () {
                function AdminMainComponent(jobService, router) {
                    this.jobService = jobService;
                    this.router = router;
                }
                AdminMainComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.jobService.getJobs()
                        .subscribe(function (jobs) {
                        _this.jobs = jobs;
                        _this.jobService.jobs = jobs;
                    }, function (error) { return console.log(error); });
                };
                AdminMainComponent.prototype.postNewJobs = function () {
                    this.router.navigate(['PostEditJob', { id: null }]);
                };
                AdminMainComponent.prototype.jobEdit = function (jobId) {
                    this.router.navigate(['PostEditJob', { id: jobId }]);
                };
                AdminMainComponent.prototype.viewApplicants = function (jobId) {
                    this.router.navigate(['ViewApplicant', { id: jobId }]);
                };
                AdminMainComponent.prototype.jobDelete = function (job) {
                    this.jobService.deleteJob(job)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
                };
                AdminMainComponent.prototype.registeredUsers = function () {
                    this.router.navigate(['RegisteredUsers']);
                };
                AdminMainComponent = __decorate([
                    core_11.Component({
                        selector: 'rb-admin-main',
                        template: "\n        <h1>Welcome to Administrators Only Page</h1>\n        <ol class=\"breadcrumb\">\n            <li><a [routerLink]=\"['AdminMain']\">Home</a></li>\n        </ol>\n        <div>\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"postNewJobs()\">Post New Jobs</button>\n        <button type=\"button\" class=\"btn btn-primary\" [routerLink]=\"['RegisteredUsers']\">Registered Users</button>\n        </div>\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th>Number of Jobs</th><th>Job Title</th><th>Job Description</th><th>Job Posted Date</th>\n                    <th>Job End Date</th><th>No of Applicants</th><th>Edit Jobs</th><th>Delete Jobs</th>\n                </tr>\n            </thead>\n            <tbody *ngFor=\"#job of jobs; #i = index\">\n                <tr>\n                    <td>{{ i + 1 }}</td>\n                    <td>{{ job.jobTitle }}</td>\n                    <td>{{ job.jobDescription }}</td>\n                    <td>{{ job.jobPostedDate | datetransform | date }}</td>\n                    <td>{{ job.jobEndDate | datetransform | date }}</td>\n                    <td><button type=\"button\" class=\"btn btn-warning\" (click)=\"viewApplicants(job.jobId)\">View Applicants</button></td>\n                    <td><button type=\"button\" class=\"btn btn-info\" (click)=\"jobEdit(job.jobId)\">Edit</button></td>\n                    <td><button type=\"button\" class=\"btn btn-danger\" (click)=\"jobDelete(job)\">Delete</button></td>\n                </tr>\n            </tbody>\n        </table>\n    ",
                        directives: [router_6.ROUTER_DIRECTIVES],
                        providers: [job_service_2.JobService, view_applicant_component_1.ViewApplicantComponent],
                        pipes: [date_transform_pipe_1.DateTransform]
                    }), 
                    __metadata('design:paramtypes', [job_service_2.JobService, router_6.Router])
                ], AdminMainComponent);
                return AdminMainComponent;
            }());
            exports_14("AdminMainComponent", AdminMainComponent);
        }
    }
});
System.register("applicant/applicant.main.component", ['angular2/core', "angular2/router", "shared/date.transform.pipe", "shared/job.service", "shared/user.service"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_12, router_7, date_transform_pipe_2, job_service_3, user_service_3;
    var ApplicantMainComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
            },
            function (date_transform_pipe_2_1) {
                date_transform_pipe_2 = date_transform_pipe_2_1;
            },
            function (job_service_3_1) {
                job_service_3 = job_service_3_1;
            },
            function (user_service_3_1) {
                user_service_3 = user_service_3_1;
            }],
        execute: function() {
            ApplicantMainComponent = (function () {
                function ApplicantMainComponent(jobService, router, userService) {
                    this.jobService = jobService;
                    this.router = router;
                    this.userService = userService;
                }
                ApplicantMainComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.jobService.getJobs()
                        .subscribe(function (jobs) {
                        _this.jobs = jobs;
                        _this.jobService.jobs = jobs;
                    }, function (error) { return console.log(error); });
                };
                ApplicantMainComponent.prototype.jobApply = function (job) {
                    var userId = +localStorage.getItem('userId');
                    console.log(job.jobId, userId);
                    this.userService.addJob(userId, job.jobId)
                        .subscribe(function (error) { return console.log(error); });
                };
                ApplicantMainComponent.prototype.editMyProfile = function () {
                    var userId = localStorage.getItem('userId');
                    this.router.navigate(['Add', { id: userId }]);
                };
                ApplicantMainComponent.prototype.deleteMyProfile = function () {
                    var _this = this;
                    this.userService.deleteUser()
                        .subscribe(function (data) {
                        console.log(data),
                            localStorage.clear(),
                            _this.router.navigate(['Start']);
                    }, function (error) { return console.log(error); });
                };
                ApplicantMainComponent = __decorate([
                    core_12.Component({
                        selector: 'rb-admin-main',
                        template: "\n        <h1>My profile</h1>\n        <div>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"editMyProfile()\">Edit My Profile</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteMyProfile()\">Delete My Profile</button>\n        </div>\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th>Job Title</th><th>Job Description</th><th>Job Posted Date</th>\n                    <th>Job End Date</th><th>Apply To Jobs</th>\n                </tr>\n            </thead>\n            <tbody *ngFor=\"#job of jobs\">\n                <tr>\n                    <td>{{ job.jobTitle }}</td>\n                    <td>{{ job.jobDescription }}</td>\n                    <td>{{ job.jobPostedDate | datetransform | date }}</td>\n                    <td>{{ job.jobEndDate | datetransform | date }}</td>\n                    <td><button type=\"button\" class=\"btn btn-info\" (click)=\"jobApply(job)\">Apply</button></td>\n                </tr>\n            </tbody>\n        </table>\n    ",
                        providers: [job_service_3.JobService, user_service_3.UserService],
                        pipes: [date_transform_pipe_2.DateTransform]
                    }), 
                    __metadata('design:paramtypes', [job_service_3.JobService, router_7.Router, user_service_3.UserService])
                ], ApplicantMainComponent);
                return ApplicantMainComponent;
            }());
            exports_15("ApplicantMainComponent", ApplicantMainComponent);
        }
    }
});
System.register("admin/applicant.complete.profile.component", ['angular2/core', "angular2/router", "shared/user.service", "shared/date.transform.pipe"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_13, router_8, user_service_4, date_transform_pipe_3;
    var ApplicantCompleteProfile;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (router_8_1) {
                router_8 = router_8_1;
            },
            function (user_service_4_1) {
                user_service_4 = user_service_4_1;
            },
            function (date_transform_pipe_3_1) {
                date_transform_pipe_3 = date_transform_pipe_3_1;
            }],
        execute: function() {
            ApplicantCompleteProfile = (function () {
                function ApplicantCompleteProfile(userService, routeParams) {
                    this.userService = userService;
                    this.routeParams = routeParams;
                    this.appledJobs = [];
                    this.educationProfiles = [];
                }
                ApplicantCompleteProfile.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userId = +this.routeParams.get('id');
                    this.userService.getUserByIdJobs(this.userId)
                        .subscribe(function (user) {
                        _this.firstName = user.firstName,
                            _this.lastName = user.lastName,
                            _this.emailId = user.emailId,
                            _this.educationProfiles = user.educationProfile,
                            _this.userService.job = user.appliedJobs,
                            _this.appledJobs = _this.userService.job;
                    }, function (error) { return console.log(error); });
                };
                ApplicantCompleteProfile.prototype.userJobDelete = function (jobId) {
                    this.userService.userJobDelete(this.userId, jobId)
                        .subscribe(function (error) { return console.log(error); });
                };
                ApplicantCompleteProfile.prototype.deleteJob = function (jobId) {
                    for (var i = this.appledJobs.length - 1; i >= 0; i--) {
                        if (this.appledJobs[i].jobId === jobId)
                            this.appledJobs.splice(i, 1);
                    }
                };
                ApplicantCompleteProfile = __decorate([
                    core_13.Component({
                        selector: 'rb-view-applicant',
                        template: "\n        <ol class=\"breadcrumb\">\n            <li><a [routerLink]=\"['AdminMain']\">Home</a></li>\n            <li><a>Job Applicants</a></li>\n            <li>Applicant Compelete Profile</li>\n        </ol>\n        <div class=\"row\">\n        <div class=\"form-group row\">\n            <label for=\"example-text-input\" class=\"col-xs-2 col-form-label\">First Name:</label>\n                <div class=\"col-xs-10\">\n                    {{ firstName }}\n                </div>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"example-text-input\" class=\"col-xs-2 col-form-label\">Last Name:</label>\n                <div class=\"col-xs-10\">\n                    {{ lastName }}\n                </div>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"example-text-input\" class=\"col-xs-2 col-form-label\">Email Id:</label>\n                <div class=\"col-xs-10\">\n                    {{ emailId }}\n                </div>\n        </div>\n        <hr>\n        <div *ngIf=\"educationProfiles\">\n        <h4>Education Details</h4>\n        <table class=\"table table-bordered\">\n            <thead>\n                <tr>\n                    <th>No:</th><th>Degree:</th><th>University:</th><th>Passed Year:</th>\n                </tr>\n            </thead>\n            <tbody *ngFor=\"#education of educationProfiles; #i = index\">\n                <tr>\n                    <th scope=\"row\">{{ i + 1 }}</th>\n                    <td>{{ education?.major }}</td>\n                    <td>{{ education?.university }}</td>\n                    <td>{{ education?.year }}</td>\n                </tr>\n            </tbody>\n        </table>\n        </div>\n        <hr>\n        <h4 *ngIf=\"!appledJobs\">This applicant has not applied for any job</h4>\n        <div *ngIf=\"appledJobs\">\n        <h4>Jobs Applied</h4>\n        <table class=\"table table-bordered\">\n            <thead>\n                <tr>\n                    <th>No:</th><th>Job Title:</th><th>Job Description:</th>\n                    <th>Appled On:</th><th>Delete Jobs</th>\n                </tr>\n            </thead>\n            <tbody *ngFor=\"#job of appledJobs; #i = index\">\n                <tr>\n                    <th scope=\"row\">{{ i + 1 }}</th>\n                    <td>{{ job?.jobTitle }}</td>\n                    <td>{{ job?.jobDescription }}</td>\n                    <td>{{ job?.appliedOn | datetransform | date }}</td>\n                    <td><button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteJob(job?.jobId)\" (click)=\"userJobDelete(job?.jobId)\">Delete</button></td>\n                </tr>\n            </tbody>\n        </table>\n        </div>    \n        </div>\n    ",
                        directives: [router_8.ROUTER_DIRECTIVES],
                        pipes: [date_transform_pipe_3.DateTransform]
                    }), 
                    __metadata('design:paramtypes', [user_service_4.UserService, router_8.RouteParams])
                ], ApplicantCompleteProfile);
                return ApplicantCompleteProfile;
            }());
            exports_16("ApplicantCompleteProfile", ApplicantCompleteProfile);
        }
    }
});
System.register("applicant/applicant.component", ['angular2/core', "angular2/router", 'angular2/common', "shared/auth.service", "shared/user"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_14, router_9, common_3, auth_service_3, user_ts_2;
    var ApplicantComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (router_9_1) {
                router_9 = router_9_1;
            },
            function (common_3_1) {
                common_3 = common_3_1;
            },
            function (auth_service_3_1) {
                auth_service_3 = auth_service_3_1;
            },
            function (user_ts_2_1) {
                user_ts_2 = user_ts_2_1;
            }],
        execute: function() {
            ApplicantComponent = (function () {
                function ApplicantComponent(formBuilder, authService, router) {
                    this.formBuilder = formBuilder;
                    this.authService = authService;
                    this.router = router;
                }
                ApplicantComponent.prototype.ngOnInit = function () {
                    this.applicantLoginForm = this.formBuilder.group({
                        'emailId': ['', common_3.Validators.compose([
                                common_3.Validators.required,
                                this.isEmail
                            ])],
                        'password': ['', common_3.Validators.required]
                    });
                };
                ApplicantComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                ApplicantComponent.prototype.applicantLoginFormSubmit = function () {
                    var _this = this;
                    var user = new user_ts_2.User(this.applicantLoginForm.value.emailId, this.applicantLoginForm.value.password);
                    this.authService.applicantLogin(user)
                        .subscribe(function (data) {
                        localStorage.setItem('token', data.token),
                            localStorage.setItem('userId', data.userId);
                        _this.router.navigate(['ApplicantMain']);
                    }, function (error) { return console.log(error); });
                };
                ApplicantComponent = __decorate([
                    core_14.Component({
                        selector: 'rb-applicant',
                        template: "\n     <h1>For Applicants</h1>\n     <h1><small>Enter your Email Id and password to log in</small></h1>\n     <form [ngFormModel]=\"applicantLoginForm\">\n        <div class=\"form-group\">\n            <label for=\"emailId\">Email Id</label>\n            <input \n             type=\"text\"\n             placeholder=\"Enter your Email Id\" \n             class=\"form-control\" \n             id=\"emailId\" \n             [ngFormControl]=\"applicantLoginForm.find('emailId')\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <input \n             type=\"password\" \n             placeholder=\"Enter your Password\"\n             class=\"form-control\" \n             id=\"password\" \n             [ngFormControl]=\"applicantLoginForm.find('password')\">\n        </div>\n    </form>\n    <button type=\"button\" class=\"btn btn-info\" \n            [disabled]=\"!applicantLoginForm.valid\" \n            (click)=\"applicantLoginFormSubmit()\">Login</button>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_3.FormBuilder, auth_service_3.AuthService, router_9.Router])
                ], ApplicantComponent);
                return ApplicantComponent;
            }());
            exports_17("ApplicantComponent", ApplicantComponent);
        }
    }
});
System.register("applicant/add.edit.applicant.component", ['angular2/core', "angular2/router", 'rxjs/Rx', 'angular2/common', "shared/user.service", "shared/user", "shared/education"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_15, router_10, common_4, user_service_5, user_ts_3, education_ts_1;
    var AddEditApplicantComponent;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (router_10_1) {
                router_10 = router_10_1;
            },
            function (_4) {},
            function (common_4_1) {
                common_4 = common_4_1;
            },
            function (user_service_5_1) {
                user_service_5 = user_service_5_1;
            },
            function (user_ts_3_1) {
                user_ts_3 = user_ts_3_1;
            },
            function (education_ts_1_1) {
                education_ts_1 = education_ts_1_1;
            }],
        execute: function() {
            AddEditApplicantComponent = (function () {
                function AddEditApplicantComponent(formBuilder, userService, routeParams, router) {
                    this.formBuilder = formBuilder;
                    this.userService = userService;
                    this.routeParams = routeParams;
                    this.router = router;
                    this.degrees = new common_4.ControlArray([]);
                    this.education = [];
                    this.isNew = true;
                    this.userId = 0;
                    this.initilizeForm(null);
                }
                AddEditApplicantComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userId = +this.routeParams.get('id');
                    if (this.userId !== 0) {
                        this.isNew = false;
                        this.userService.getUserById(this.userId)
                            .subscribe(function (data) {
                            _this.initilizeForm(data);
                        }, function (error) { return console.log(error); });
                    }
                    else {
                        this.isNew = true;
                    }
                };
                AddEditApplicantComponent.prototype.initilizeForm = function (user) {
                    var userFirstName;
                    var userLastName;
                    var userEmailId;
                    var userEducationProfile = new common_4.ControlArray([]);
                    if (!this.isNew) {
                        for (var i = 0; i < user.educationProfile.length; i++) {
                            this.degrees.push(new common_4.ControlGroup({
                                'major': new common_4.Control(user.educationProfile[i].major, common_4.Validators.required),
                                'university': new common_4.Control(user.educationProfile[i].university, common_4.Validators.required),
                                'year': new common_4.Control(user.educationProfile[i].year, common_4.Validators.required)
                            }));
                        }
                        userFirstName = user.firstName;
                        userLastName = user.lastName;
                        userEmailId = user.emailId;
                    }
                    this.singupForm = this.formBuilder.group({
                        firstName: [userFirstName, common_4.Validators.required],
                        lastName: [userLastName, common_4.Validators.required],
                        emailId: [userEmailId, common_4.Validators.compose([
                                common_4.Validators.required
                            ])],
                        password: ['', common_4.Validators.required],
                        confirmPassword: ['', common_4.Validators.required],
                        degrees: this.degrees
                    }, { validator: this.matchPasswords('password', 'confirmPassword') });
                };
                AddEditApplicantComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                AddEditApplicantComponent.prototype.uniqueEmailValidator = function (control) {
                    var promise = new Promise(function (resolve, reject) {
                    });
                };
                AddEditApplicantComponent.prototype.matchPasswords = function (passwordKey, passwordConfirmationKey) {
                    return function (group) {
                        var passwordInput = group.controls[passwordKey];
                        var passwordConfirmationInput = group.controls[passwordConfirmationKey];
                        if (passwordInput.value !== passwordConfirmationInput.value) {
                            return passwordConfirmationInput.setErrors({ notEquivalent: true });
                        }
                    };
                };
                AddEditApplicantComponent.prototype.addDegree = function () {
                    this.degrees.push(new common_4.ControlGroup({
                        'major': new common_4.Control('', common_4.Validators.required),
                        'university': new common_4.Control('', common_4.Validators.required),
                        'year': new common_4.Control('', common_4.Validators.required)
                    }));
                };
                AddEditApplicantComponent.prototype.deleteDegree = function (index) {
                    this.degrees.removeAt(index);
                };
                AddEditApplicantComponent.prototype.saveCancel = function () {
                    this.router.navigate(['ApplicantMain']);
                };
                AddEditApplicantComponent.prototype.singupFormSubmit = function () {
                    var _this = this;
                    for (var i = 0; i < this.singupForm.value.degrees.length; i++) {
                        this.education.push(new education_ts_1.Education(this.singupForm.value.degrees[i].major, this.singupForm.value.degrees[i].university, this.singupForm.value.degrees[i].year));
                    }
                    var user = new user_ts_3.User(this.singupForm.value.emailId, this.singupForm.value.password, this.singupForm.value.firstName, this.singupForm.value.lastName, null, this.singupForm.value.degrees, null);
                    this.userService.addUser(user)
                        .subscribe(function (data) {
                        _this.router.navigate(['Start']);
                    }, function (error) { return console.log(error); });
                };
                AddEditApplicantComponent.prototype.singupFormSave = function () {
                    for (var i = 0; i < this.singupForm.value.degrees.length; i++) {
                        this.education.push(new education_ts_1.Education(this.singupForm.value.degrees[i].major, this.singupForm.value.degrees[i].university, this.singupForm.value.degrees[i].year));
                    }
                    var user = new user_ts_3.User(this.singupForm.value.emailId, this.singupForm.value.password, this.singupForm.value.firstName, this.singupForm.value.lastName, null, this.singupForm.value.degrees, null);
                    this.userService.editUser(this.userId, user)
                        .subscribe(function (error) { return console.log(error); });
                };
                AddEditApplicantComponent = __decorate([
                    core_15.Component({
                        selector: 'rb-new-applicant',
                        template: "\n    <form [ngFormModel]=\"singupForm\">\n            <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input \n                     placeholder=\"Enter your First Name\"\n                     type=\"text\" \n                     id=\"firstName\" \n                     class=\"form-control\"\n                     [ngFormControl]=\"singupForm.find('firstName')\">\n                <div *ngIf=\"!singupForm.find('firstName').valid && singupForm.find('firstName').touched\">Your First Name is required!</div>     \n                </div>\n                <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input \n                     placeholder=\"Enter your Last Name\" \n                     type=\"text\" id=\"lastName\" \n                     class=\"form-control\"\n                     [ngFormControl]=\"singupForm.find('lastName')\">\n                <div *ngIf=\"!singupForm.find('lastName').valid && singupForm.find('lastName').touched\">Your Last Name is required!</div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\">E-Mail</label>\n                    <input\n                     placeholder=\"Enter your E-Mail Id\"\n                     type=\"email\" \n                     id=\"email\" \n                     class=\"form-control\"\n                     [ngFormControl]=\"singupForm.find('emailId')\"\n                     [disabled]=\"!isNew\" >\n                <div *ngIf=\"!singupForm.find('emailId').valid && singupForm.find('emailId').touched\">Your valid E-Mail Id is required!</div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input  \n                     placeholder=\"Enter your Password\"\n                     type=\"password\" \n                     id=\"password\" \n                     class=\"form-control\"\n                     [ngFormControl]=\"singupForm.find('password')\">\n                <div *ngIf=\"!singupForm.find('password').valid && singupForm.find('password').touched\">Your must enter a password!</div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Confirm Password</label>\n                    <input \n                     placeholder=\"Confirm your Password\"\n                     type=\"password\" \n                     id=\"password\" \n                     class=\"form-control\"\n                     [ngFormControl]=\"singupForm.find('confirmPassword')\">\n                </div>     \n                <div *ngIf=\"!singupForm.find('confirmPassword').valid && singupForm.find('confirmPassword').touched\">Your must confirm your password!</div>\n                <div *ngFor=\"#degree of degrees.controls; #i = index\">\n                    <label>Your Education: {{i+1}}</label>\n                    <div class=\"row\">\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-3\">\n                        <label>Major</label>\n                        <input type=\"text\" placeholder=\"Enter you Major\" [ngFormControl]=\"degree.controls.major\"/>\n                        </div>\n                        <div class=\"col-xs-3\">\n                        <label>University</label>\n                        <input type=\"text\" placeholder=\"Enter you University\" [ngFormControl]=\"degree.controls.university\"/>\n                        </div>\n                        <div class=\"col-xs-3\">\n                        <label>Year</label>\n                        <input type=\"text\" placeholder=\"Enter Year\" [ngFormControl]=\"degree.controls.year\"/>\n                        </div>\n                        <div class=\"col-sm-2\">\n                            <button class=\"btn btn-danger\" (click)=\"deleteDegree(i)\">Delete Degree</button>\n                        </div>\n                    </div>\n                    </div>\n                    <hr>\n                </div>\n        </form>\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"addDegree()\">Add New Degree</button>\n        <hr>\n        <button type=\"submit\" class=\"btn btn-primary\" *ngIf=\"isNew\" [disabled]=\"!singupForm.valid\" (click)=\"singupFormSubmit(singupForm.value)\">Sign Up</button>\n        <button type=\"submit\" class=\"btn btn-primary\" *ngIf=\"!isNew\" [disabled]=\"!singupForm.valid\" (click)=\"singupFormSave(singupForm.value)\">Save</button>\n        <button type=\"submit\" class=\"btn btn-danger\" *ngIf=\"!isNew\" (click)=\"saveCancel()\">Cancel</button>\n    ",
                        providers: [user_service_5.UserService]
                    }), 
                    __metadata('design:paramtypes', [common_4.FormBuilder, user_service_5.UserService, router_10.RouteParams, router_10.Router])
                ], AddEditApplicantComponent);
                return AddEditApplicantComponent;
            }());
            exports_18("AddEditApplicantComponent", AddEditApplicantComponent);
        }
    }
});
System.register("app.component", ['angular2/core', 'angular2/router', "header.component", "start.component", "admin/admin.component", "admin/admin.main.component", "applicant/applicant.main.component", "admin/view.applicant.component", "admin/applicant.complete.profile.component", "admin/view.registered.users.component", "admin/post.edit.job.component", "applicant/applicant.component", "applicant/add.edit.applicant.component", "shared/user.service"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_16, router_11, header_component_1, start_component_1, admin_component_1, admin_main_component_1, applicant_main_component_1, view_applicant_component_2, applicant_complete_profile_component_1, view_registered_users_component_1, post_edit_job_component_1, applicant_component_1, add_edit_applicant_component_1, user_service_6;
    var AppComponent;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (router_11_1) {
                router_11 = router_11_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (start_component_1_1) {
                start_component_1 = start_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (admin_main_component_1_1) {
                admin_main_component_1 = admin_main_component_1_1;
            },
            function (applicant_main_component_1_1) {
                applicant_main_component_1 = applicant_main_component_1_1;
            },
            function (view_applicant_component_2_1) {
                view_applicant_component_2 = view_applicant_component_2_1;
            },
            function (applicant_complete_profile_component_1_1) {
                applicant_complete_profile_component_1 = applicant_complete_profile_component_1_1;
            },
            function (view_registered_users_component_1_1) {
                view_registered_users_component_1 = view_registered_users_component_1_1;
            },
            function (post_edit_job_component_1_1) {
                post_edit_job_component_1 = post_edit_job_component_1_1;
            },
            function (applicant_component_1_1) {
                applicant_component_1 = applicant_component_1_1;
            },
            function (add_edit_applicant_component_1_1) {
                add_edit_applicant_component_1 = add_edit_applicant_component_1_1;
            },
            function (user_service_6_1) {
                user_service_6 = user_service_6_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_16.Component({
                        selector: 'rb-app',
                        template: "  \n        <my-header></my-header>\n        <div class=\"container\">\n            <router-outlet></router-outlet>\n        </div>\n    ",
                        directives: [header_component_1.HeaderComponent, router_11.ROUTER_DIRECTIVES],
                        providers: [user_service_6.UserService]
                    }),
                    router_11.RouteConfig([
                        { path: '/', name: 'Start', component: start_component_1.StartComponent, useAsDefault: true },
                        { path: 'login/admin-login', name: 'Admin', component: admin_component_1.AdminComponent },
                        { path: 'jobs', name: 'AdminMain', component: admin_main_component_1.AdminMainComponent },
                        { path: 'view-registered-users', name: 'RegisteredUsers', component: view_registered_users_component_1.ViewRegisteredUsersComponent },
                        { path: 'jobs/view-applicant', name: 'ViewApplicant', component: view_applicant_component_2.ViewApplicantComponent },
                        { path: 'jobs/view-applicant/', name: 'CompleteProfile', component: applicant_complete_profile_component_1.ApplicantCompleteProfile },
                        { path: 'job', name: 'PostEditJob', component: post_edit_job_component_1.PostEditJobComponent },
                        { path: 'job/:id', name: 'PostEditJob', component: post_edit_job_component_1.PostEditJobComponent },
                        { path: 'login/applicant-login', name: 'Applicant', component: applicant_component_1.ApplicantComponent },
                        { path: 'login/applicant-login/my-profile', name: 'ApplicantMain', component: applicant_main_component_1.ApplicantMainComponent },
                        { path: '/add-applicant', name: 'Add', component: add_edit_applicant_component_1.AddEditApplicantComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_19("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', 'angular2/router', 'angular2/http', "app.component", "shared/user.service", "shared/auth.service"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var browser_1, router_12, http_4, app_component_1, user_service_7, auth_service_4;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_12_1) {
                router_12 = router_12_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (user_service_7_1) {
                user_service_7 = user_service_7_1;
            },
            function (auth_service_4_1) {
                auth_service_4 = auth_service_4_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [auth_service_4.AuthService, user_service_7.UserService, router_12.ROUTER_PROVIDERS, http_4.HTTP_PROVIDERS]);
        }
    }
});
System.register("logout.component", ['angular2/core', 'angular2/router', "shared/auth.service"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_17, router_13, auth_service_5;
    var LogoutComponent;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (router_13_1) {
                router_13 = router_13_1;
            },
            function (auth_service_5_1) {
                auth_service_5 = auth_service_5_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent(authService, router) {
                    this.authService = authService;
                    this.router = router;
                }
                LogoutComponent.prototype.userLogout = function () {
                    this.authService.logout();
                    this.router.navigate(['Start']);
                };
                LogoutComponent = __decorate([
                    core_17.Component({
                        selector: 'rb-admin',
                        template: ""
                    }), 
                    __metadata('design:paramtypes', [auth_service_5.AuthService, router_13.Router])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_21("LogoutComponent", LogoutComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9qb2IudHMiLCJzaGFyZWQvZWR1Y2F0aW9uLnRzIiwic2hhcmVkL3VzZXIudHMiLCJzaGFyZWQvYXV0aC5zZXJ2aWNlLnRzIiwiaGVhZGVyLmNvbXBvbmVudC50cyIsInN0YXJ0LmNvbXBvbmVudC50cyIsImFkbWluL2FkbWluLmNvbXBvbmVudC50cyIsInNoYXJlZC9qb2Iuc2VydmljZS50cyIsImFkbWluL3Bvc3QuZWRpdC5qb2IuY29tcG9uZW50LnRzIiwic2hhcmVkL3VzZXIuc2VydmljZS50cyIsImFkbWluL3ZpZXcucmVnaXN0ZXJlZC51c2Vycy5jb21wb25lbnQudHMiLCJhZG1pbi92aWV3LmFwcGxpY2FudC5jb21wb25lbnQudHMiLCJzaGFyZWQvZGF0ZS50cmFuc2Zvcm0ucGlwZS50cyIsImFkbWluL2FkbWluLm1haW4uY29tcG9uZW50LnRzIiwiYXBwbGljYW50L2FwcGxpY2FudC5tYWluLmNvbXBvbmVudC50cyIsImFkbWluL2FwcGxpY2FudC5jb21wbGV0ZS5wcm9maWxlLmNvbXBvbmVudC50cyIsImFwcGxpY2FudC9hcHBsaWNhbnQuY29tcG9uZW50LnRzIiwiYXBwbGljYW50L2FkZC5lZGl0LmFwcGxpY2FudC5jb21wb25lbnQudHMiLCJhcHAuY29tcG9uZW50LnRzIiwiYm9vdC50cyIsImxvZ291dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUNBO2dCQUNJLGFBQW1CLFFBQWdCLEVBQVMsY0FBc0IsRUFDL0MsVUFBZ0IsRUFBUyxhQUFvQixFQUM3QyxLQUFjLEVBQVMsVUFBaUI7b0JBRnhDLGFBQVEsR0FBUixRQUFRLENBQVE7b0JBQVMsbUJBQWMsR0FBZCxjQUFjLENBQVE7b0JBQy9DLGVBQVUsR0FBVixVQUFVLENBQU07b0JBQVMsa0JBQWEsR0FBYixhQUFhLENBQU87b0JBQzdDLFVBQUssR0FBTCxLQUFLLENBQVM7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBTztn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LENBRkEsQUFFQyxJQUFBO1lBRkQsd0NBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNuQ0QsbUJBQVMsQ0FBQyw0QkFBWSxFQUFFLENBQUMsMEJBQVcsRUFBRSwwQkFBVyxFQUFFLDBCQUFnQixFQUFFLHFCQUFjLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNDdEY7Z0JBRUkseUJBQW1CLFdBQXdCLEVBQVMsTUFBYztvQkFBL0MsZ0JBQVcsR0FBWCxXQUFXLENBQWE7b0JBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtnQkFFbEUsQ0FBQztnQkFFRCxvQ0FBVSxHQUFWO29CQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFkTDtvQkFBQyxpQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxVQUFVO3dCQUNwQixRQUFRLEVBQUUsRUFBRTtxQkFDZixDQUFDOzttQ0FBQTtnQkFZRixzQkFBQztZQUFELENBVkEsQUFVQyxJQUFBO1lBVkQsOENBVUMsQ0FBQSIsImZpbGUiOiIuLi8uLi8uLi9Kb2JzUHJvamVjdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIEpvYiB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgam9iVGl0bGU6IHN0cmluZywgcHVibGljIGpvYkRlc2NyaXB0aW9uOiBzdHJpbmcsIFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGpvYkVuZERhdGU6IERhdGUsIHB1YmxpYyBqb2JQb3N0ZWREYXRlPzogRGF0ZSxcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBqb2JJZD86IG51bWJlciwgcHVibGljIGpvYkFwcGxpZWQ/OiBEYXRlKSB7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgRWR1Y2F0aW9ue1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG1ham9yPzogc3RyaW5nLCBwdWJsaWMgdW5pdmVyc2l0eT86IHN0cmluZywgcHVibGljIHllYXI/OiBudW1iZXIpIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBKb2IgfSBmcm9tICcuL2pvYic7XHJcbmltcG9ydCB7IEVkdWNhdGlvbiB9IGZyb20gJy4vZWR1Y2F0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyIHsgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1haWxJZD86IHN0cmluZywgcHVibGljIHBhc3N3b3JkPzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGZpcnN0TmFtZT86IHN0cmluZywgcHVibGljIGxhc3ROYW1lPzogc3RyaW5nLCBwdWJsaWMgdXNlcklkPzogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGVkdWNhdGlvblByb2ZpbGU/OiBFZHVjYXRpb25bXSwgcHVibGljIGFwcGxpZWRKb2JzPzogSm9iW10pIHtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tICdhbmd1bGFyMi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2UgeyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRtaW5Mb2dpbih1c2VyOiBVc2VyKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9sb2dpbi9hZG1pbi1sb2dpbicsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXBwbGljYW50TG9naW4odXNlcjogVXNlcikge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh1c2VyKTtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbG9naW4vYXBwbGljYW50LWxvZ2luJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTG9nZ2VkSW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQoKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZG1pbkFkZCh1c2VyOiBVc2VyKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9sb2dpbi9hZGQtYWRtaW4nLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXIgfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2F1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktaGVhZGVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJ1N0YXJ0J11cIiBjbGFzcz1cIm5hdmJhci1icmFuZFwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1ob21lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xXCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXZcIj5cclxuICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQWRtaW4nXVwiICpuZ0lmPVwiIWlzTG9nZ2VkSW4oKVwiPkFkbWluaXN0cmF0b3JzIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1sb2ctaW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ0FwcGxpY2FudCddXCIgKm5nSWY9XCIhaXNMb2dnZWRJbigpXCI+QXBwbGljYW50cyA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbG9nLWluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT48L2xpPlxyXG4gICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydBZGQnXVwiICpuZ0lmPVwiIWlzTG9nZ2VkSW4oKVwiPk5ldyBBcHBsaWNhbnRzIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1sb2ctaW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9hPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItcmlnaHRcIj5cclxuICAgICAgICAgICAgPGxpPjxhIChjbGljayk9XCJsb2dvdXQoKVwiICpuZ0lmPVwiaXNMb2dnZWRJbigpXCI+TG9nb3V0IDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1sb2ctb3V0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvYT48L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L25hdj5cclxuICAgIGAsXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xvZ2dlZEluKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5pc0xvZ2dlZEluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydTdGFydCddKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdyYi1zdGFydCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gSm9icyBQcm9maWxlPC9oMT5cclxuICAgICAgICA8aDE+PHNtYWxsPkNsaWNrIG9uIGFwcHJvcHJpYXRlIGxpbmtzIHRvIGNvbnRpbnVlPC9zbWFsbD48L2gxPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRDb21wb25lbnQge1xyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIFxyXG4gICAgICAgICBDb250cm9sR3JvdXAsIFxyXG4gICAgICAgICBWYWxpZGF0b3JzLCBcclxuICAgICAgICAgQ29udHJvbFxyXG4gICAgICAgfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC91c2VyLnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdyYi1hZG1pbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGgxPkZvciBBZG1pbmlzdHJhdG9ycyBPbmx5PC9oMT5cclxuICAgIDxoMT48c21hbGw+RW50ZXIgeW91ciBFbWFpbCBJZCBhbmQgcGFzc3dvcmQgdG8gbG9nIGluPC9zbWFsbD48L2gxPlxyXG4gICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJhZG1pbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbElkXCI+RW1haWwgSWQ8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIEVtYWlsIElkXCJcclxuICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICBpZD1cImVtYWlsSWRcIlxyXG4gICAgICAgICAgICAgW25nRm9ybUNvbnRyb2xdPVwiYWRtaW5Mb2dpbkZvcm0uZmluZCgnZW1haWxJZCcpXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBQYXNzd29yZFwiXHJcbiAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxyXG4gICAgICAgICAgICAgaWQ9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICAgW25nRm9ybUNvbnRyb2xdPVwiYWRtaW5Mb2dpbkZvcm0uZmluZCgncGFzc3dvcmQnKVwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWluZm9cIiBcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFhZG1pbkxvZ2luRm9ybS52YWxpZFwiIFxyXG4gICAgICAgICAgICAoY2xpY2spPVwiYWRtaW5Mb2dpbkZvcm1TdWJtaXQoKVwiPkxvZ2luPC9idXR0b24+XHJcbiAgICBgLFxyXG4gICAgcHJvdmlkZXJzOiBbQXV0aFNlcnZpY2VdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQWRtaW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgYWRtaW5Mb2dpbkZvcm06IENvbnRyb2xHcm91cDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlciwgcHVibGljIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHVibGljIHJvdXRlcjogUm91dGVyKSB7IFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFkbWluTG9naW5Gb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgICdlbWFpbElkJzogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxyXG4gICAgICAgICAgICBdKV0sXHJcbiAgICAgICAgICAgICdwYXNzd29yZCc6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHtbczE6IHN0cmluZ106IGJvb2xlYW59IHtcclxuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUubWF0Y2goXCJbYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZG1pbkxvZ2luRm9ybVN1Ym1pdCgpIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodGhpcy5hZG1pbkxvZ2luRm9ybS52YWx1ZS5lbWFpbElkLCB0aGlzLmFkbWluTG9naW5Gb3JtLnZhbHVlLnBhc3N3b3JkKTtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmFkbWluTG9naW4odXNlcilcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIGRhdGEudG9rZW4pLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJJZCcsIGRhdGEudXNlcklkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydBZG1pbk1haW4nXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7IEh0dHAsIEhlYWRlcnMgfSBmcm9tICdhbmd1bGFyMi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5cclxuaW1wb3J0IHsgSm9iIH0gZnJvbSAnLi9qb2InO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSm9iU2VydmljZSB7XHJcblxyXG4gICAgam9iczogSm9iW10gPSBbXTtcclxuXHJcbiAgICBqb2I6IEpvYjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRKb2JzKCkge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvam9iL2FsbC1qb2JzJyArIHRva2VuKVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRKb2JzID0gcmVzcG9uc2UuanNvbigpLmpvYnM7XHJcbiAgICAgICAgICAgIGxldCBqb2JPYmplY3RzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ2V0Sm9icy5sZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBqb2JzID0gbmV3IEpvYihnZXRKb2JzW2ldLmpvYl90aXRsZSwgZ2V0Sm9ic1tpXS5qb2JfZGVzY3JpcHRpb24sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEpvYnNbaV0uam9iX2VuZF9kYXRlLCBnZXRKb2JzW2ldLmpvYl9wb3N0ZWRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRKb2JzW2ldLmpvYl9pZCk7XHJcbiAgICAgICAgICAgICAgICBqb2JPYmplY3RzLnB1c2goam9icyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBqb2JPYmplY3RzO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Sm9iKGpvYklkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2pvYi9zaW5nbGUtam9iLycgKyBqb2JJZCArIHRva2VuKVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRKb2IgPSByZXNwb25zZS5qc29uKCkuam9iO1xyXG4gICAgICAgICAgICBsZXQgam9iID0gbmV3IEpvYihnZXRKb2JbMF0uam9iX3RpdGxlLCBnZXRKb2JbMF0uam9iX2Rlc2NyaXB0aW9uLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRKb2JbMF0uam9iX2VuZF9kYXRlLCBnZXRKb2JbMF0uam9iX3Bvc3RlZF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEpvYlswXS5qb2JfaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gam9iO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEpvYihqb2I6IEpvYikge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShqb2IpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9qb2IvcG9zdC1qb2IvJyArIHRva2VuLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdldEpvYiA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgam9iID0gbmV3IEpvYihnZXRKb2Iuam9iVGl0bGUsIGdldEpvYi5qb2JEZXNjcmlwdGlvbiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Sm9iLmpvYkVuZERhdGUsIGdldEpvYi5qb2JQb3N0ZWREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEpvYi5qb2JJZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gam9iO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRKb2Ioam9iSWQ6IG51bWJlciwgam9iOiBKb2IpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoam9iKTtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9qb2IvZWRpdC1qb2IvJyArIGpvYklkICsgdG9rZW4sIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSApXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlSm9iKGpvYjogSm9iKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9qb2IvZGVsZXRlLWpvYi8nICsgam9iLmpvYklkICsgdG9rZW4pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKSxcclxuICAgICAgICAgICAgdGhpcy5qb2JzLnNwbGljZSh0aGlzLmpvYnMuaW5kZXhPZihqb2IpLCAxKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlUGFyYW1zIH0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgXHJcbiAgICAgICAgIENvbnRyb2xHcm91cCwgXHJcbiAgICAgICAgIFZhbGlkYXRvcnMsIFxyXG4gICAgICAgICBDb250cm9sLCBcclxuICAgICAgICAgQ29udHJvbEFycmF5XHJcbiAgICAgICB9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBKb2IgfSBmcm9tICcuLi9zaGFyZWQvam9iJztcclxuaW1wb3J0IHsgSm9iU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9qb2Iuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncmItcG9zdC1qb2JzJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cImpvYkZvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImpvYlRpdGxlXCI+Sm9iIFRpdGxlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGEgSm9iIFRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiam9iVGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdGb3JtQ29udHJvbF09XCJqb2JGb3JtLmZpbmQoJ2pvYlRpdGxlJylcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiam9iRW5kRGF0ZVwiPkpvYiBBcHBsaWNhdGlvbiBFbmQgRGF0ZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiam9iRW5kRGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXT1cImpvYkZvcm0uZmluZCgnam9iRW5kRGF0ZScpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImpvYkRlc2NyaXB0aW9uXCI+QSBicmllZiBEZXNjcmlwdGlvbiBhYm91dCB0aGUgam9iOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIFxyXG4gICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICByb3dzPVwiNVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICBpZD1cImpvYkRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgW25nRm9ybUNvbnRyb2xdPVwiam9iRm9ybS5maW5kKCdqb2JEZXNjcmlwdGlvbicpXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAqbmdJZj1cImlzTmV3XCIgW2Rpc2FibGVkXT1cIiFqb2JGb3JtLnZhbGlkXCIgKGNsaWNrKT1cImpvYkZvcm1TdWJtaXQoKVwiPlBvc3Q8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKm5nSWY9XCIhaXNOZXdcIiBbZGlzYWJsZWRdPVwiIWpvYkZvcm0udmFsaWRcIiAoY2xpY2spPVwiam9iRm9ybVN1Ym1pdCgpXCI+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIChjbGljayk9XCJvbkNhbmNlbCgpXCI+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtKb2JTZXJ2aWNlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvc3RFZGl0Sm9iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBqb2JGb3JtOiBDb250cm9sR3JvdXA7XHJcbiAgICBwdWJsaWMgam9iSWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpc05ldzogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgam9iRGF0ZTogRGF0ZTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHB1YmxpYyBqb2JTZXJ2aWNlOiBKb2JTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlciwgcHVibGljIHJvdXRlUGFyYW1zOiBSb3V0ZVBhcmFtcykgeyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpbGl6ZUZvcm0obnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IFxyXG4gICAgICAgIGlmKHRoaXMucm91dGVQYXJhbXMuZ2V0KCdpZCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iSWQgPSArIHRoaXMucm91dGVQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuam9iU2VydmljZS5nZXRKb2IodGhpcy5qb2JJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlsaXplRm9ybShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWxpemVGb3JtKGpvYjogSm9iKSB7XHJcbiAgICAgICAgbGV0IGpvYlRpdGxlO1xyXG4gICAgICAgIGxldCBqb2JEZXNjcmlwdGlvbjtcclxuICAgICAgICBsZXQgam9iRW5kRGF0ZTogYW55O1xyXG5cclxuICAgICAgICBpZighdGhpcy5pc05ldykge1xyXG4gICAgICAgICAgICBqb2JUaXRsZSA9IGpvYi5qb2JUaXRsZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqb2JUaXRsZSk7XHJcbiAgICAgICAgICAgIGpvYkRlc2NyaXB0aW9uID0gam9iLmpvYkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBqb2JFbmREYXRlID0gam9iLmpvYkVuZERhdGU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY3VzdG9tRGF5OiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBjdXN0b21Nb250aDogYW55O1xyXG4gICAgICAgICAgICBsZXQgY3VzdG9tRGF0ZSA9IG5ldyBEYXRlKGpvYkVuZERhdGUpO1xyXG5cclxuICAgICAgICAgICAgY3VzdG9tRGF5ID0gY3VzdG9tRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIGlmKGN1c3RvbURheSA8PSA5KSB7XHJcbiAgICAgICAgICAgIGN1c3RvbURheSA9ICcwJyArIGN1c3RvbURheTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbURheTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VzdG9tTW9udGggPSAoY3VzdG9tRGF0ZS5nZXRNb250aCgpKzEpO1xyXG4gICAgICAgICAgICBpZihjdXN0b21Nb250aCA8PSA5KSB7XHJcbiAgICAgICAgICAgIGN1c3RvbU1vbnRoID0gJzAnICsgY3VzdG9tTW9udGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21Nb250aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqb2JFbmREYXRlID0gY3VzdG9tRGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBjdXN0b21Nb250aCArIFwiLVwiICsgY3VzdG9tRGF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5qb2JGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgIGpvYlRpdGxlOiBbam9iVGl0bGUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICBqb2JFbmREYXRlOiBbam9iRW5kRGF0ZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIGpvYkRlc2NyaXB0aW9uOiBbam9iRGVzY3JpcHRpb24sIFZhbGlkYXRvcnMucmVxdWlyZWRdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGpvYkZvcm1TdWJtaXQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5pc05ldykge1xyXG4gICAgICAgICAgICBjb25zdCBqb2IgPSBuZXcgSm9iKHRoaXMuam9iRm9ybS52YWx1ZS5qb2JUaXRsZSwgdGhpcy5qb2JGb3JtLnZhbHVlLmpvYkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qb2JGb3JtLnZhbHVlLmpvYkVuZERhdGUpO1xyXG4gICAgICAgIHRoaXMuam9iU2VydmljZS5hZGRKb2Ioam9iKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qb2JTZXJ2aWNlLmpvYnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnQWRtaW5NYWluJ10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5qb2JTZXJ2aWNlLmVkaXRKb2IodGhpcy5qb2JJZCwgdGhpcy5qb2JGb3JtLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qb2JTZXJ2aWNlLmpvYnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydBZG1pbk1haW4nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ0FkbWluTWFpbiddKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBIdHRwLCBIZWFkZXJzIH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcclxuaW1wb3J0IHsgSm9iIH0gZnJvbSAnLi9qb2InO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xyXG4gICAgXHJcbiAgICBwdWJsaWMgdXNlcnM6IFVzZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBqb2I6IEpvYltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVXNlcih1c2VyOiBVc2VyKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHVzZXIpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcHBsaWNhbnQvYWRkLW5ldy11c2VyJywgYm9keSwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJzQnlKb2JJZChqb2JJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcHBsaWNhbnQvYWxsLWFwcGxpY2FudHMvJyArIGpvYklkICsgdG9rZW4pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFVzZXJzID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgbGV0IHVzZXJPYmplY3RzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ2V0VXNlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gbmV3IFVzZXIoZ2V0VXNlcnNbaV0uZW1haWxJZCwgZ2V0VXNlcnNbaV0ucGFzc3dvcmQsIGdldFVzZXJzW2ldLmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFVzZXJzW2ldLmxhc3ROYW1lLCBnZXRVc2Vyc1tpXS5faWQpO1xyXG4gICAgICAgICAgICAgICAgdXNlck9iamVjdHMucHVzaCh1c2Vycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJPYmplY3RzXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VycygpIHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpID8gJz90b2tlbj0nICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiAnJztcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwcGxpY2FudC9hbGwtdXNlcnMvJyArIHRva2VuKVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRVc2VycyA9IHJlc3BvbnNlLmpzb24oKS51c2VyT2JqcztcclxuICAgICAgICAgICAgbGV0IHVzZXJPYmplY3RzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ2V0VXNlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gbmV3IFVzZXIobnVsbCwgbnVsbCwgZ2V0VXNlcnNbaV0uZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VXNlcnNbaV0ubGFzdE5hbWUsIGdldFVzZXJzW2ldLnVzZXJJZCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB1c2VyT2JqZWN0cy5wdXNoKHVzZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdXNlck9iamVjdHNcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJCeUlkKHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcHBsaWNhbnQvdXNlci1ieS1pZC8nICsgdXNlcklkICsgdG9rZW4pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFVzZXJPYmplY3QgPSByZXNwb25zZS5qc29uKCkudXNlck9iajtcclxuICAgICAgICAgICAgdGhpcy5qb2IgPSBnZXRVc2VyT2JqZWN0LmpvYnM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFVzZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRVc2VyT2JqZWN0LmpvYnMpO1xyXG4gICAgICAgICAgICBsZXQgdXNlck9iamVjdCA9IG5ldyBVc2VyKGdldFVzZXJPYmplY3QuZW1haWxJZCwgZ2V0VXNlck9iamVjdC5wYXNzd29yZCwgZ2V0VXNlck9iamVjdC5maXJzdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VXNlck9iamVjdC5sYXN0TmFtZSwgbnVsbCwgZ2V0VXNlck9iamVjdC5lZHVjYXRpb25Qcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFVzZXJPYmplY3QuZWR1Y2F0aW9uUHJvZmlsZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyT2JqZWN0O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckJ5SWRKb2JzKHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcHBsaWNhbnQvYWRtaW4vdXNlci1ieS1pZC8nICsgdXNlcklkICsgdG9rZW4pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFVzZXJPYmplY3QgPSByZXNwb25zZS5qc29uKCkudXNlck9iajtcclxuICAgICAgICAgICAgdGhpcy5qb2IgPSBnZXRVc2VyT2JqZWN0LmFwcGxpZWRKb2JzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmpvYik7XHJcbiAgICAgICAgICAgIGxldCB1c2VyT2JqZWN0ID0gbmV3IFVzZXIoZ2V0VXNlck9iamVjdC5lbWFpbElkLCBnZXRVc2VyT2JqZWN0LnBhc3N3b3JkLCBnZXRVc2VyT2JqZWN0LmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRVc2VyT2JqZWN0Lmxhc3ROYW1lLCBudWxsLCBnZXRVc2VyT2JqZWN0LmVkdWNhdGlvblByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VXNlck9iamVjdC5hcHBsaWVkSm9icyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyT2JqZWN0O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFVzZXIodXNlcklkOiBudW1iZXIsIHVzZXI6IFVzZXIpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBwbGljYW50L2VkaXQtcHJvZmlsZS8nICsgdXNlcklkICsgdG9rZW4sIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSApXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVXNlcigpIHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcHBsaWNhbnQvZGVsZXRlLXByb2ZpbGUvJyArIHRva2VuLCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgKVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEpvYih1c2VySWQ6IG51bWJlciwgam9iSWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyd1c2VySWQnOiB1c2VySWQsICdqb2JJZCc6IGpvYklkfSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA/ICc/dG9rZW49JyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvam9iL2FkZC1qb2IvJyArIHRva2VuLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlckpvYkRlbGV0ZSh1c2VySWQ6IG51bWJlciwgam9iSWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPyAnP3Rva2VuPScgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSA6ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvam9iL2RlbGV0ZS1hcHBsaWNhbnQtam9iLycgKyB1c2VySWQgKyAnLycgKyBqb2JJZCArICcvJyArIHRva2VuKVxyXG4gICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRVc2VyT2JqZWN0ID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gdGhpcy5qb2IubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuam9iW2ldLmpvYklkID09PSBnZXRVc2VyT2JqZWN0KSB0aGlzLmpvYi5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZ2V0VXNlck9iamVjdDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgUk9VVEVSX0RJUkVDVElWRVMgfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vc2hhcmVkL3VzZXInO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC91c2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3JiLXJlZ2lzdGVyZWQtdXNlcnMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxvbCBjbGFzcz1cImJyZWFkY3J1bWJcIj5cclxuICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQWRtaW5NYWluJ11cIj5Ib21lPC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5SZWdpc3RlcmVkIFVzZXJzPC9saT5cclxuICAgICAgICA8L29sPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMlwiPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gY2xlYXJmaXhcIiAqbmdGb3I9XCIjdXNlciBvZiB1c2Vyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNCAoY2xpY2spPVwidXNlclByb2ZpbGUodXNlci51c2VySWQpXCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1wiPnt7IHVzZXIuZmlyc3ROYW1lIH19IHt7IHVzZXIubGFzdE5hbWUgfX08L2g0PlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxyXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmlld1JlZ2lzdGVyZWRVc2Vyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIHVzZXJzOiBVc2VyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJzKClcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICB1c2VycyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdXNlcnMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXJzID0gdXNlcnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXNlclByb2ZpbGUodXNlcklkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ0NvbXBsZXRlUHJvZmlsZScsIHtpZDogdXNlcklkfV0pO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgUk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlUGFyYW1zIH0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC91c2VyJztcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvdXNlci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdyYi12aWV3LWFwcGxpY2FudCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxvbCBjbGFzcz1cImJyZWFkY3J1bWJcIj5cclxuICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQWRtaW5NYWluJ11cIj5Ib21lPC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5Kb2IgQXBwbGljYW50czwvbGk+XHJcbiAgICAgICAgPC9vbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTJcIj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGNsZWFyZml4XCIgKm5nRm9yPVwiI3VzZXIgb2YgdXNlcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQgKGNsaWNrKT1cInVzZXJQcm9maWxlKHVzZXIuX2lkKVwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcIj57eyB1c2VyLmZpcnN0TmFtZSB9fSB7eyB1c2VyLmxhc3ROYW1lIH19PC9oND5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdBcHBsaWNhbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgXHJcbiAgICBwdWJsaWMgdXNlcnM6IFVzZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBqb2JJZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHB1YmxpYyByb3V0ZXI6IFJvdXRlciwgcHVibGljIHJvdXRlUGFyYW1zOiBSb3V0ZVBhcmFtcykgeyBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5qb2JJZCA9IHRoaXMucm91dGVQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcnNCeUpvYklkKHRoaXMuam9iSWQpXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgdXNlcnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VycyA9IHVzZXJzLFxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS51c2VycyA9IHVzZXJzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlclByb2ZpbGUodXNlcklkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ0NvbXBsZXRlUHJvZmlsZScsIHtpZDogdXNlcklkfV0pO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdkYXRldHJhbnNmb3JtJ1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVUcmFuc2Zvcm0gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgUk9VVEVSX0RJUkVDVElWRVMgfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgSm9iIH0gZnJvbSAnLi4vc2hhcmVkL2pvYi50cyc7XHJcbmltcG9ydCB7IEpvYlNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvam9iLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3N0RWRpdEpvYkNvbXBvbmVudCB9IGZyb20gJy4vcG9zdC5lZGl0LmpvYi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaWV3UmVnaXN0ZXJlZFVzZXJzQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3LnJlZ2lzdGVyZWQudXNlcnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlld0FwcGxpY2FudENvbXBvbmVudCB9IGZyb20gJy4vdmlldy5hcHBsaWNhbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0ZVRyYW5zZm9ybSB9IGZyb20gJy4uL3NoYXJlZC9kYXRlLnRyYW5zZm9ybS5waXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdyYi1hZG1pbi1tYWluJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gQWRtaW5pc3RyYXRvcnMgT25seSBQYWdlPC9oMT5cclxuICAgICAgICA8b2wgY2xhc3M9XCJicmVhZGNydW1iXCI+XHJcbiAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ0FkbWluTWFpbiddXCI+SG9tZTwvYT48L2xpPlxyXG4gICAgICAgIDwvb2w+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJwb3N0TmV3Sm9icygpXCI+UG9zdCBOZXcgSm9iczwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW3JvdXRlckxpbmtdPVwiWydSZWdpc3RlcmVkVXNlcnMnXVwiPlJlZ2lzdGVyZWQgVXNlcnM8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPk51bWJlciBvZiBKb2JzPC90aD48dGg+Sm9iIFRpdGxlPC90aD48dGg+Sm9iIERlc2NyaXB0aW9uPC90aD48dGg+Sm9iIFBvc3RlZCBEYXRlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+Sm9iIEVuZCBEYXRlPC90aD48dGg+Tm8gb2YgQXBwbGljYW50czwvdGg+PHRoPkVkaXQgSm9iczwvdGg+PHRoPkRlbGV0ZSBKb2JzPC90aD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keSAqbmdGb3I9XCIjam9iIG9mIGpvYnM7ICNpID0gaW5kZXhcIj5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgaSArIDEgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57eyBqb2Iuam9iVGl0bGUgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57eyBqb2Iuam9iRGVzY3JpcHRpb24gfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57eyBqb2Iuam9iUG9zdGVkRGF0ZSB8IGRhdGV0cmFuc2Zvcm0gfCBkYXRlIH19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgam9iLmpvYkVuZERhdGUgfCBkYXRldHJhbnNmb3JtIHwgZGF0ZSB9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInZpZXdBcHBsaWNhbnRzKGpvYi5qb2JJZClcIj5WaWV3IEFwcGxpY2FudHM8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taW5mb1wiIChjbGljayk9XCJqb2JFZGl0KGpvYi5qb2JJZClcIj5FZGl0PC9idXR0b24+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIChjbGljayk9XCJqb2JEZWxldGUoam9iKVwiPkRlbGV0ZTwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICBgLFxyXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcclxuICAgIHByb3ZpZGVyczogW0pvYlNlcnZpY2UsIFZpZXdBcHBsaWNhbnRDb21wb25lbnRdLFxyXG4gICAgcGlwZXM6IFtEYXRlVHJhbnNmb3JtXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkbWluTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIGpvYnM6IEpvYltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBqb2JTZXJ2aWNlOiBKb2JTZXJ2aWNlLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuam9iU2VydmljZS5nZXRKb2JzKClcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBqb2JzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9icyA9IGpvYnNcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iU2VydmljZS5qb2JzID0gam9icztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdE5ld0pvYnMoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydQb3N0RWRpdEpvYicsIHtpZDogbnVsbH1dKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgam9iRWRpdChqb2JJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydQb3N0RWRpdEpvYicsIHtpZDogam9iSWR9XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpZXdBcHBsaWNhbnRzKGpvYklkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ1ZpZXdBcHBsaWNhbnQnLCB7aWQ6IGpvYklkfV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBqb2JEZWxldGUoam9iOiBKb2IpIHtcclxuICAgICAgICB0aGlzLmpvYlNlcnZpY2UuZGVsZXRlSm9iKGpvYilcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlcmVkVXNlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydSZWdpc3RlcmVkVXNlcnMnXSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRlVHJhbnNmb3JtIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGUudHJhbnNmb3JtLnBpcGUnO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tICcuLi9zaGFyZWQvam9iLnRzJztcclxuaW1wb3J0IHsgSm9iU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9qb2Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3VzZXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncmItYWRtaW4tbWFpbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxoMT5NeSBwcm9maWxlPC9oMT5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cImVkaXRNeVByb2ZpbGUoKVwiPkVkaXQgTXkgUHJvZmlsZTwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiAoY2xpY2spPVwiZGVsZXRlTXlQcm9maWxlKClcIj5EZWxldGUgTXkgUHJvZmlsZTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+Sm9iIFRpdGxlPC90aD48dGg+Sm9iIERlc2NyaXB0aW9uPC90aD48dGg+Sm9iIFBvc3RlZCBEYXRlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+Sm9iIEVuZCBEYXRlPC90aD48dGg+QXBwbHkgVG8gSm9iczwvdGg+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHkgKm5nRm9yPVwiI2pvYiBvZiBqb2JzXCI+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGpvYi5qb2JUaXRsZSB9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGpvYi5qb2JEZXNjcmlwdGlvbiB9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGpvYi5qb2JQb3N0ZWREYXRlIHwgZGF0ZXRyYW5zZm9ybSB8IGRhdGUgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57eyBqb2Iuam9iRW5kRGF0ZSB8IGRhdGV0cmFuc2Zvcm0gfCBkYXRlIH19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWluZm9cIiAoY2xpY2spPVwiam9iQXBwbHkoam9iKVwiPkFwcGx5PC9idXR0b24+PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtKb2JTZXJ2aWNlLCBVc2VyU2VydmljZV0sXHJcbiAgICBwaXBlczogW0RhdGVUcmFuc2Zvcm1dXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwbGljYW50TWFpbkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGpvYnM6IEpvYltdO1xyXG4gICAgcHVibGljIGpvYklkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGpvYlNlcnZpY2U6IEpvYlNlcnZpY2UsIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICAgICAgICAgIHB1YmxpYyB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHsgXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmpvYlNlcnZpY2UuZ2V0Sm9icygpXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgam9icyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYnMgPSBqb2JzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlNlcnZpY2Uuam9icyA9IGpvYnM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGpvYkFwcGx5KGpvYjogSm9iKSB7XHJcbiAgICAgICAgbGV0IHVzZXJJZCA9ICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJJZCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGpvYi5qb2JJZCwgdXNlcklkKTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmFkZEpvYih1c2VySWQsIGpvYi5qb2JJZClcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlZGl0TXlQcm9maWxlKCkge1xyXG4gICAgICAgIGxldCB1c2VySWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJyk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydBZGQnLCB7aWQ6IHVzZXJJZH1dKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlTXlQcm9maWxlKCkge1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZGVsZXRlVXNlcigpXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKSxcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydTdGFydCddKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgUk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlUGFyYW1zIH0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC91c2VyJztcclxuaW1wb3J0IHsgSm9iIH0gZnJvbSAnLi4vc2hhcmVkL2pvYic7XHJcbmltcG9ydCB7IEVkdWNhdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9lZHVjYXRpb24nO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC91c2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRlVHJhbnNmb3JtIH0gZnJvbSAnLi4vc2hhcmVkL2RhdGUudHJhbnNmb3JtLnBpcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3JiLXZpZXctYXBwbGljYW50JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG9sIGNsYXNzPVwiYnJlYWRjcnVtYlwiPlxyXG4gICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydBZG1pbk1haW4nXVwiPkhvbWU8L2E+PC9saT5cclxuICAgICAgICAgICAgPGxpPjxhPkpvYiBBcHBsaWNhbnRzPC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5BcHBsaWNhbnQgQ29tcGVsZXRlIFByb2ZpbGU8L2xpPlxyXG4gICAgICAgIDwvb2w+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZXhhbXBsZS10ZXh0LWlucHV0XCIgY2xhc3M9XCJjb2wteHMtMiBjb2wtZm9ybS1sYWJlbFwiPkZpcnN0IE5hbWU6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBmaXJzdE5hbWUgfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZXhhbXBsZS10ZXh0LWlucHV0XCIgY2xhc3M9XCJjb2wteHMtMiBjb2wtZm9ybS1sYWJlbFwiPkxhc3QgTmFtZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhc3ROYW1lIH19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImV4YW1wbGUtdGV4dC1pbnB1dFwiIGNsYXNzPVwiY29sLXhzLTIgY29sLWZvcm0tbGFiZWxcIj5FbWFpbCBJZDo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGVtYWlsSWQgfX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxocj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZWR1Y2F0aW9uUHJvZmlsZXNcIj5cclxuICAgICAgICA8aDQ+RWR1Y2F0aW9uIERldGFpbHM8L2g0PlxyXG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+Tm86PC90aD48dGg+RGVncmVlOjwvdGg+PHRoPlVuaXZlcnNpdHk6PC90aD48dGg+UGFzc2VkIFllYXI6PC90aD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keSAqbmdGb3I9XCIjZWR1Y2F0aW9uIG9mIGVkdWNhdGlvblByb2ZpbGVzOyAjaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwicm93XCI+e3sgaSArIDEgfX08L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57eyBlZHVjYXRpb24/Lm1ham9yIH19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgZWR1Y2F0aW9uPy51bml2ZXJzaXR5IH19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgZWR1Y2F0aW9uPy55ZWFyIH19PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aHI+XHJcbiAgICAgICAgPGg0ICpuZ0lmPVwiIWFwcGxlZEpvYnNcIj5UaGlzIGFwcGxpY2FudCBoYXMgbm90IGFwcGxpZWQgZm9yIGFueSBqb2I8L2g0PlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJhcHBsZWRKb2JzXCI+XHJcbiAgICAgICAgPGg0PkpvYnMgQXBwbGllZDwvaDQ+XHJcbiAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWRcIj5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aD5Obzo8L3RoPjx0aD5Kb2IgVGl0bGU6PC90aD48dGg+Sm9iIERlc2NyaXB0aW9uOjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPkFwcGxlZCBPbjo8L3RoPjx0aD5EZWxldGUgSm9iczwvdGg+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHkgKm5nRm9yPVwiI2pvYiBvZiBhcHBsZWRKb2JzOyAjaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwicm93XCI+e3sgaSArIDEgfX08L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57eyBqb2I/LmpvYlRpdGxlIH19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgam9iPy5qb2JEZXNjcmlwdGlvbiB9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPnt7IGpvYj8uYXBwbGllZE9uIHwgZGF0ZXRyYW5zZm9ybSB8IGRhdGUgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgKGNsaWNrKT1cImRlbGV0ZUpvYihqb2I/LmpvYklkKVwiIChjbGljayk9XCJ1c2VySm9iRGVsZXRlKGpvYj8uam9iSWQpXCI+RGVsZXRlPC9idXR0b24+PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L2Rpdj4gICAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcclxuICAgIHBpcGVzOiBbRGF0ZVRyYW5zZm9ybV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhbnRDb21wbGV0ZVByb2ZpbGUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGVtYWlsSWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBhcHBsZWRKb2JzOiBKb2JbXSA9IFtdO1xyXG4gICAgcHVibGljIGVkdWNhdGlvblByb2ZpbGVzOiBFZHVjYXRpb25bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHB1YmxpYyByb3V0ZVBhcmFtczogUm91dGVQYXJhbXMpIHsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gKyB0aGlzLnJvdXRlUGFyYW1zLmdldCgnaWQnKTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJCeUlkSm9icyh0aGlzLnVzZXJJZClcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICB1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdXNlci5maXJzdE5hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROYW1lID0gdXNlci5sYXN0TmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1haWxJZCA9IHVzZXIuZW1haWxJZCxcclxuICAgICAgICAgICAgICAgIHRoaXMuZWR1Y2F0aW9uUHJvZmlsZXMgPSB1c2VyLmVkdWNhdGlvblByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmpvYiA9IHVzZXIuYXBwbGllZEpvYnMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxlZEpvYnMgPSB0aGlzLnVzZXJTZXJ2aWNlLmpvYlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1c2VySm9iRGVsZXRlKGpvYklkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXJKb2JEZWxldGUodGhpcy51c2VySWQsIGpvYklkKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZUpvYihqb2JJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gdGhpcy5hcHBsZWRKb2JzLmxlbmd0aC0xOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5hcHBsZWRKb2JzW2ldLmpvYklkID09PSBqb2JJZCkgdGhpcy5hcHBsZWRKb2JzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuaW1wb3J0IHsgUk9VVEVSX0RJUkVDVElWRVMsIFJvdXRlciB9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIFxyXG4gICAgICAgICBDb250cm9sR3JvdXAsIFxyXG4gICAgICAgICBWYWxpZGF0b3JzLFxyXG4gICAgICAgICBDb250cm9sXHJcbiAgICAgICB9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vc2hhcmVkL3VzZXIudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3JiLWFwcGxpY2FudCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgIDxoMT5Gb3IgQXBwbGljYW50czwvaDE+XHJcbiAgICAgPGgxPjxzbWFsbD5FbnRlciB5b3VyIEVtYWlsIElkIGFuZCBwYXNzd29yZCB0byBsb2cgaW48L3NtYWxsPjwvaDE+XHJcbiAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cImFwcGxpY2FudExvZ2luRm9ybVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbElkXCI+RW1haWwgSWQ8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgRW1haWwgSWRcIiBcclxuICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICBpZD1cImVtYWlsSWRcIiBcclxuICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXT1cImFwcGxpY2FudExvZ2luRm9ybS5maW5kKCdlbWFpbElkJylcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIFBhc3N3b3JkXCJcclxuICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgICBbbmdGb3JtQ29udHJvbF09XCJhcHBsaWNhbnRMb2dpbkZvcm0uZmluZCgncGFzc3dvcmQnKVwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWluZm9cIiBcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFhcHBsaWNhbnRMb2dpbkZvcm0udmFsaWRcIiBcclxuICAgICAgICAgICAgKGNsaWNrKT1cImFwcGxpY2FudExvZ2luRm9ybVN1Ym1pdCgpXCI+TG9naW48L2J1dHRvbj5cclxuICAgIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIGFwcGxpY2FudExvZ2luRm9ybTogQ29udHJvbEdyb3VwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwdWJsaWMgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXBwbGljYW50TG9naW5Gb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgICAgICdlbWFpbElkJzogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxyXG4gICAgICAgICAgICBdKV0sXHJcbiAgICAgICAgICAgICdwYXNzd29yZCc6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHtbczE6IHN0cmluZ106IGJvb2xlYW59IHtcclxuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUubWF0Y2goXCJbYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhcHBsaWNhbnRMb2dpbkZvcm1TdWJtaXQoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHRoaXMuYXBwbGljYW50TG9naW5Gb3JtLnZhbHVlLmVtYWlsSWQsIHRoaXMuYXBwbGljYW50TG9naW5Gb3JtLnZhbHVlLnBhc3N3b3JkKTtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmFwcGxpY2FudExvZ2luKHVzZXIpXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBkYXRhLnRva2VuKSxcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCBkYXRhLnVzZXJJZClcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnQXBwbGljYW50TWFpbiddKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZVBhcmFtcywgUm91dGVyIH0gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1JYJztcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIFxyXG4gICAgICAgICBDb250cm9sR3JvdXAsIFxyXG4gICAgICAgICBWYWxpZGF0b3JzLCBcclxuICAgICAgICAgQ29udHJvbCwgXHJcbiAgICAgICAgIENvbnRyb2xBcnJheVxyXG4gICAgICAgfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvdXNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC91c2VyLnRzJztcclxuaW1wb3J0IHsgRWR1Y2F0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2VkdWNhdGlvbi50cyc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3JiLW5ldy1hcHBsaWNhbnQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJzaW5ndXBGb3JtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0TmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIEZpcnN0IE5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICBpZD1cImZpcnN0TmFtZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXT1cInNpbmd1cEZvcm0uZmluZCgnZmlyc3ROYW1lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhc2luZ3VwRm9ybS5maW5kKCdmaXJzdE5hbWUnKS52YWxpZCAmJiBzaW5ndXBGb3JtLmZpbmQoJ2ZpcnN0TmFtZScpLnRvdWNoZWRcIj5Zb3VyIEZpcnN0IE5hbWUgaXMgcmVxdWlyZWQhPC9kaXY+ICAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibGFzdE5hbWVcIj5MYXN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIExhc3QgTmFtZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBcclxuICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgICAgICBbbmdGb3JtQ29udHJvbF09XCJzaW5ndXBGb3JtLmZpbmQoJ2xhc3ROYW1lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhc2luZ3VwRm9ybS5maW5kKCdsYXN0TmFtZScpLnZhbGlkICYmIHNpbmd1cEZvcm0uZmluZCgnbGFzdE5hbWUnKS50b3VjaGVkXCI+WW91ciBMYXN0IE5hbWUgaXMgcmVxdWlyZWQhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RS1NYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIEUtTWFpbCBJZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICBpZD1cImVtYWlsXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgICAgICAgW25nRm9ybUNvbnRyb2xdPVwic2luZ3VwRm9ybS5maW5kKCdlbWFpbElkJylcIlxyXG4gICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWlzTmV3XCIgPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFzaW5ndXBGb3JtLmZpbmQoJ2VtYWlsSWQnKS52YWxpZCAmJiBzaW5ndXBGb3JtLmZpbmQoJ2VtYWlsSWQnKS50b3VjaGVkXCI+WW91ciB2YWxpZCBFLU1haWwgSWQgaXMgcmVxdWlyZWQhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAgXHJcbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBQYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgICAgICAgW25nRm9ybUNvbnRyb2xdPVwic2luZ3VwRm9ybS5maW5kKCdwYXNzd29yZCcpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXNpbmd1cEZvcm0uZmluZCgncGFzc3dvcmQnKS52YWxpZCAmJiBzaW5ndXBGb3JtLmZpbmQoJ3Bhc3N3b3JkJykudG91Y2hlZFwiPllvdXIgbXVzdCBlbnRlciBhIHBhc3N3b3JkITwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPkNvbmZpcm0gUGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDb25maXJtIHlvdXIgUGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICAgaWQ9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXT1cInNpbmd1cEZvcm0uZmluZCgnY29uZmlybVBhc3N3b3JkJylcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXNpbmd1cEZvcm0uZmluZCgnY29uZmlybVBhc3N3b3JkJykudmFsaWQgJiYgc2luZ3VwRm9ybS5maW5kKCdjb25maXJtUGFzc3dvcmQnKS50b3VjaGVkXCI+WW91ciBtdXN0IGNvbmZpcm0geW91ciBwYXNzd29yZCE8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwiI2RlZ3JlZSBvZiBkZWdyZWVzLmNvbnRyb2xzOyAjaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPllvdXIgRWR1Y2F0aW9uOiB7e2krMX19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5NYWpvcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91IE1ham9yXCIgW25nRm9ybUNvbnRyb2xdPVwiZGVncmVlLmNvbnRyb2xzLm1ham9yXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Vbml2ZXJzaXR5PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3UgVW5pdmVyc2l0eVwiIFtuZ0Zvcm1Db250cm9sXT1cImRlZ3JlZS5jb250cm9scy51bml2ZXJzaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5ZZWFyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFbnRlciBZZWFyXCIgW25nRm9ybUNvbnRyb2xdPVwiZGVncmVlLmNvbnRyb2xzLnllYXJcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIChjbGljayk9XCJkZWxldGVEZWdyZWUoaSlcIj5EZWxldGUgRGVncmVlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxocj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJhZGREZWdyZWUoKVwiPkFkZCBOZXcgRGVncmVlPC9idXR0b24+XHJcbiAgICAgICAgPGhyPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKm5nSWY9XCJpc05ld1wiIFtkaXNhYmxlZF09XCIhc2luZ3VwRm9ybS52YWxpZFwiIChjbGljayk9XCJzaW5ndXBGb3JtU3VibWl0KHNpbmd1cEZvcm0udmFsdWUpXCI+U2lnbiBVcDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKm5nSWY9XCIhaXNOZXdcIiBbZGlzYWJsZWRdPVwiIXNpbmd1cEZvcm0udmFsaWRcIiAoY2xpY2spPVwic2luZ3VwRm9ybVNhdmUoc2luZ3VwRm9ybS52YWx1ZSlcIj5TYXZlPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiICpuZ0lmPVwiIWlzTmV3XCIgKGNsaWNrKT1cInNhdmVDYW5jZWwoKVwiPkNhbmNlbDwvYnV0dG9uPlxyXG4gICAgYCxcclxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkZEVkaXRBcHBsaWNhbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHNpbmd1cEZvcm06IENvbnRyb2xHcm91cDtcclxuICAgIGRlZ3JlZXM6IENvbnRyb2xBcnJheSA9IG5ldyBDb250cm9sQXJyYXkoW10pO1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgZWR1Y2F0aW9uOiBFZHVjYXRpb25bXSA9IFtdO1xyXG4gICAgcHVibGljIGlzTmV3OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsIHB1YmxpYyB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHVibGljIHJvdXRlUGFyYW1zOiBSb3V0ZVBhcmFtcywgcHVibGljIHJvdXRlcjogUm91dGVyKSB7IFxyXG4gICAgICAgIHRoaXMuaW5pdGlsaXplRm9ybShudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9ICsgdGhpcy5yb3V0ZVBhcmFtcy5nZXQoJ2lkJyk7XHJcbiAgICAgICAgaWYodGhpcy51c2VySWQgIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJCeUlkKHRoaXMudXNlcklkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpbGl6ZUZvcm0oZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOZXcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0aWxpemVGb3JtKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICBsZXQgdXNlckZpcnN0TmFtZTtcclxuICAgICAgICBsZXQgdXNlckxhc3ROYW1lO1xyXG4gICAgICAgIGxldCB1c2VyRW1haWxJZDtcclxuICAgICAgICBsZXQgdXNlckVkdWNhdGlvblByb2ZpbGU6IENvbnRyb2xBcnJheSA9IG5ldyBDb250cm9sQXJyYXkoW10pO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzTmV3KSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB1c2VyLmVkdWNhdGlvblByb2ZpbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb250cm9sR3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFqb3InOiBuZXcgQ29udHJvbCh1c2VyLmVkdWNhdGlvblByb2ZpbGVbaV0ubWFqb3IsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndW5pdmVyc2l0eSc6IG5ldyBDb250cm9sKHVzZXIuZWR1Y2F0aW9uUHJvZmlsZVtpXS51bml2ZXJzaXR5LCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3llYXInOiBuZXcgQ29udHJvbCh1c2VyLmVkdWNhdGlvblByb2ZpbGVbaV0ueWVhciwgVmFsaWRhdG9ycy5yZXF1aXJlZClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1c2VyRmlyc3ROYW1lID0gdXNlci5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgIHVzZXJMYXN0TmFtZSA9IHVzZXIubGFzdE5hbWU7XHJcbiAgICAgICAgICAgIHVzZXJFbWFpbElkID0gdXNlci5lbWFpbElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNpbmd1cEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogW3VzZXJGaXJzdE5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IFt1c2VyTGFzdE5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICAgICAgZW1haWxJZDogW3VzZXJFbWFpbElkLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuaXNFbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGlzIHRoZXIgb24gaXNFbWFpbCBtZXRob2RcclxuICAgICAgICAgICAgICAgIF0pXSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICAgICAgICAgICAgZGVncmVlczogdGhpcy5kZWdyZWVzXHJcbiAgICAgICAgICAgIH0sIHt2YWxpZGF0b3I6IHRoaXMubWF0Y2hQYXNzd29yZHMoJ3Bhc3N3b3JkJywgJ2NvbmZpcm1QYXNzd29yZCcpfSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHtbczE6IHN0cmluZ106IGJvb2xlYW59IHtcclxuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUubWF0Y2goXCJbYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5pcXVlRW1haWxWYWxpZGF0b3IoY29udHJvbDogQ29udHJvbCk6IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oXHJcbiAgICAgICAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWF0Y2hQYXNzd29yZHMocGFzc3dvcmRLZXk6IHN0cmluZywgcGFzc3dvcmRDb25maXJtYXRpb25LZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAoZ3JvdXA6IENvbnRyb2xHcm91cCkgPT4ge1xyXG4gICAgICAgIGxldCBwYXNzd29yZElucHV0ID0gZ3JvdXAuY29udHJvbHNbcGFzc3dvcmRLZXldO1xyXG4gICAgICAgIGxldCBwYXNzd29yZENvbmZpcm1hdGlvbklucHV0ID0gZ3JvdXAuY29udHJvbHNbcGFzc3dvcmRDb25maXJtYXRpb25LZXldO1xyXG4gICAgICAgIGlmIChwYXNzd29yZElucHV0LnZhbHVlICE9PSBwYXNzd29yZENvbmZpcm1hdGlvbklucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXNzd29yZENvbmZpcm1hdGlvbklucHV0LnNldEVycm9ycyh7bm90RXF1aXZhbGVudDogdHJ1ZX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFkZERlZ3JlZSgpIHtcclxuICAgICAgICB0aGlzLmRlZ3JlZXMucHVzaChcclxuICAgICAgICAgICAgbmV3IENvbnRyb2xHcm91cCh7XHJcbiAgICAgICAgICAgICAgICAnbWFqb3InOiBuZXcgQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCksXHJcbiAgICAgICAgICAgICAgICAndW5pdmVyc2l0eSc6IG5ldyBDb250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcclxuICAgICAgICAgICAgICAgICd5ZWFyJzogbmV3IENvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVEZWdyZWUoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZGVncmVlcy5yZW1vdmVBdChpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ0FwcGxpY2FudE1haW4nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpbmd1cEZvcm1TdWJtaXQoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5kZWdyZWVzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIHRoaXMuZWR1Y2F0aW9uLnB1c2gobmV3IEVkdWNhdGlvbih0aGlzLnNpbmd1cEZvcm0udmFsdWUuZGVncmVlc1tpXS5tYWpvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5kZWdyZWVzW2ldLnVuaXZlcnNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNpbmd1cEZvcm0udmFsdWUuZGVncmVlc1tpXS55ZWFyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih0aGlzLnNpbmd1cEZvcm0udmFsdWUuZW1haWxJZCwgdGhpcy5zaW5ndXBGb3JtLnZhbHVlLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNpbmd1cEZvcm0udmFsdWUuZmlyc3ROYW1lLCB0aGlzLnNpbmd1cEZvcm0udmFsdWUubGFzdE5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLCB0aGlzLnNpbmd1cEZvcm0udmFsdWUuZGVncmVlcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5hZGRVc2VyKHVzZXIpXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ1N0YXJ0J10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaW5ndXBGb3JtU2F2ZSgpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zaW5ndXBGb3JtLnZhbHVlLmRlZ3JlZXMubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgdGhpcy5lZHVjYXRpb24ucHVzaChuZXcgRWR1Y2F0aW9uKHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5kZWdyZWVzW2ldLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaW5ndXBGb3JtLnZhbHVlLmRlZ3JlZXNbaV0udW5pdmVyc2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5kZWdyZWVzW2ldLnllYXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5lbWFpbElkLCB0aGlzLnNpbmd1cEZvcm0udmFsdWUucGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5maXJzdE5hbWUsIHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5sYXN0TmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIHRoaXMuc2luZ3VwRm9ybS52YWx1ZS5kZWdyZWVzLCBudWxsKTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmVkaXRVc2VyKHRoaXMudXNlcklkLCB1c2VyKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQgeyBST1VURVJfRElSRUNUSVZFUywgUm91dGVDb25maWcgfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuXG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RhcnRDb21wb25lbnQgfSBmcm9tICcuL3N0YXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkNvbXBvbmVudCB9IGZyb20gJy4vYWRtaW4vYWRtaW4uY29tcG9uZW50JztcbmltcG9ydCB7IEFkbWluTWFpbkNvbXBvbmVudCB9IGZyb20gJy4vYWRtaW4vYWRtaW4ubWFpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwbGljYW50TWFpbkNvbXBvbmVudCB9IGZyb20gJy4vYXBwbGljYW50L2FwcGxpY2FudC5tYWluLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3QXBwbGljYW50Q29tcG9uZW50IH0gZnJvbSAnLi9hZG1pbi92aWV3LmFwcGxpY2FudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwbGljYW50Q29tcGxldGVQcm9maWxlIH0gZnJvbSAnLi9hZG1pbi9hcHBsaWNhbnQuY29tcGxldGUucHJvZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld1JlZ2lzdGVyZWRVc2Vyc0NvbXBvbmVudCB9IGZyb20gJy4vYWRtaW4vdmlldy5yZWdpc3RlcmVkLnVzZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3N0RWRpdEpvYkNvbXBvbmVudCB9IGZyb20gJy4vYWRtaW4vcG9zdC5lZGl0LmpvYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwbGljYW50Q29tcG9uZW50IH0gZnJvbSAnLi9hcHBsaWNhbnQvYXBwbGljYW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZGRFZGl0QXBwbGljYW50Q29tcG9uZW50IH0gZnJvbSAnLi9hcHBsaWNhbnQvYWRkLmVkaXQuYXBwbGljYW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3VzZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncmItYXBwJyxcbiAgICB0ZW1wbGF0ZTogYCAgXG4gICAgICAgIDxteS1oZWFkZXI+PC9teS1oZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbSGVhZGVyQ29tcG9uZW50LCBST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdXG59KVxuXG5AUm91dGVDb25maWcoW1xuICAgIHsgcGF0aDonLycsIG5hbWU6ICdTdGFydCcsIGNvbXBvbmVudDogU3RhcnRDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZSB9LFxuICAgIHsgcGF0aDogJ2xvZ2luL2FkbWluLWxvZ2luJywgbmFtZTogJ0FkbWluJywgY29tcG9uZW50OiBBZG1pbkNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogJ2pvYnMnLCBuYW1lOiAnQWRtaW5NYWluJywgY29tcG9uZW50OiBBZG1pbk1haW5Db21wb25lbnQgfSxcbiAgICB7IHBhdGg6ICd2aWV3LXJlZ2lzdGVyZWQtdXNlcnMnLCBuYW1lOiAnUmVnaXN0ZXJlZFVzZXJzJywgY29tcG9uZW50OiBWaWV3UmVnaXN0ZXJlZFVzZXJzQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiAnam9icy92aWV3LWFwcGxpY2FudCcsIG5hbWU6ICdWaWV3QXBwbGljYW50JywgY29tcG9uZW50OiBWaWV3QXBwbGljYW50Q29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiAnam9icy92aWV3LWFwcGxpY2FudC8nLCBuYW1lOiAnQ29tcGxldGVQcm9maWxlJywgY29tcG9uZW50OiBBcHBsaWNhbnRDb21wbGV0ZVByb2ZpbGUgfSxcbiAgICB7IHBhdGg6ICdqb2InLCBuYW1lOiAnUG9zdEVkaXRKb2InLCBjb21wb25lbnQ6IFBvc3RFZGl0Sm9iQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiAnam9iLzppZCcsIG5hbWU6ICdQb3N0RWRpdEpvYicsIGNvbXBvbmVudDogUG9zdEVkaXRKb2JDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6ICdsb2dpbi9hcHBsaWNhbnQtbG9naW4nLCBuYW1lOiAnQXBwbGljYW50JywgY29tcG9uZW50OiBBcHBsaWNhbnRDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6ICdsb2dpbi9hcHBsaWNhbnQtbG9naW4vbXktcHJvZmlsZScsIG5hbWU6ICdBcHBsaWNhbnRNYWluJywgY29tcG9uZW50OiBBcHBsaWNhbnRNYWluQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiAnL2FkZC1hcHBsaWNhbnQnLCBuYW1lOiAnQWRkJywgY29tcG9uZW50OiBBZGRFZGl0QXBwbGljYW50Q29tcG9uZW50IH1cbl0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG59IiwiaW1wb3J0IHsgYm9vdHN0cmFwIH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQgeyBwcm92aWRlIH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7IFJPVVRFUl9QUk9WSURFUlMsIExvY2F0aW9uU3RyYXRlZ3ksIEhhc2hMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7IEhUVFBfUFJPVklERVJTIH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2F1dGguc2VydmljZSc7XG5cbmJvb3RzdHJhcChBcHBDb21wb25lbnQsIFtBdXRoU2VydmljZSwgVXNlclNlcnZpY2UsIFJPVVRFUl9QUk9WSURFUlMsIEhUVFBfUFJPVklERVJTXSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2F1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncmItYWRtaW4nLFxyXG4gICAgdGVtcGxhdGU6IGBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9nb3V0Q29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVzZXJMb2dvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ1N0YXJ0J10pO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
