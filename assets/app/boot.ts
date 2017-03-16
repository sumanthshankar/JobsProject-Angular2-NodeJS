import { bootstrap } from 'angular2/platform/browser';
import { provide } from "angular2/core";
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { AuthService } from './shared/auth.service';

bootstrap(AppComponent, [AuthService, UserService, ROUTER_PROVIDERS, HTTP_PROVIDERS]);