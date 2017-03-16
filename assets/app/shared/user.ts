import { Job } from './job';
import { Education } from './education';

export class User { 
    constructor(public emailId?: string, public password?: string,
                public firstName?: string, public lastName?: string, public userId?: number,
                public educationProfile?: Education[], public appliedJobs?: Job[]) {
    }
}