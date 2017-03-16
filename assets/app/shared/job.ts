
export class Job {
    constructor(public jobTitle: string, public jobDescription: string, 
                public jobEndDate: Date, public jobPostedDate?: Date,
                public jobId?: number, public jobApplied?: Date) {
    }
}