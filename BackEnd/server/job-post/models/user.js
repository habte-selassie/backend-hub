const express = require('express')
// const MongoDb = require('mongodb')
const Mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
//const { default: mongoose } = require('mongoose');


// const mongoose = require('mongoose');
// const { Schema } = mongoose;



const companySchema = new Mongoose.Schema({
    // Basic Information
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    location: { 
        address: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true }
    },

    // Contact Information
    contact: {
        email: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        website: { type: String, trim: true }
    },

    // Additional Details
    size: { type: Number },
    foundedYear: { type: Number },
    description: { type: String },
    specialties: [{ type: String }],
    socialMediaLinks: {
        linkedin: { type: String, trim: true },
        twitter: { type: String, trim: true },
        facebook: { type: String, trim: true },
        instagram: { type: String, trim: true }
    }
});

const hiringManagerSchema = new Mongoose.Schema({
    // Personal Information
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    // Contact Details
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },

    // Job Title
    jobTitle: { type: String, required: true, trim: true },

    // Department
    department: { type: String, trim: true },

    // Company Affiliation
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },

    // Additional Information
    bio: { type: String },
    linkedinProfile: { type: String, trim: true },
    twitterHandle: { type: String, trim: true },
    avatarUrl: { type: String, trim: true }
});

// Helper function to format dates as words
const formatDateAsWords = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const jobSchema = new Schema({
    name: { type: String, required: true },
    _id: { type: Number, required: true },
    HiringManager: {type: String, required: true},
    JobTitle: { type: String, required: true },
    JobDescription: { type: String, required: true },
    CompanyName: { type: String, required: true },
    companyType: { 
        type: String, 
        enum: ['Tech', 'Health', 'Social', 'Art'], 
        required: true 
    },
    Location: { type: String, required: true },
    EmploymentType: [
        { type: String, 
          enum: ['Full Time', 'Part Time'],  
        default: 'Full Time'
     }],
    SalaryRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    RequiredSkills: [{
        hardSkills: { type: String, required: true },
        softSkills: { type: String, required: true },
        default: ''
    }],
    Qualifications: {
        type: [String],
        enum: ['Certification', 'Degree', 'Education', 'Others'],
        default: ''
    },
    JobPostingDate: { 
        type: Date, 
        required: true,
        get: formatDateAsWords 
    },
    JobPostingExpiration: { 
        type: Date, 
        required: true,
        get: formatDateAsWords 
    },
    HiringManager: { 
        type: String, 
        required: true,
        set: name => name.charAt(0).toUpperCase() + name.slice(1)
    },
    NumberofOpenPositions: { type: Number, required: true },
    ApplicationDeadline: { 
        type: Date, 
        default: Date.now,
        get: formatDateAsWords 
    },
    PerksandBenefits: [{ body: String, default: null }],
    CompanyOverview: { type: String, required: true },
    InterviewProcess: { type: String, required: true },
    RelocationAssistance: { type: String, required: true },
    EqualOpportunityStatement: { type: String, required: true },
    Industry: { 
        type: String, 
        enum: ['Tech', 'Health', 'Others'], 
        required: true 
    },
    SeniorityLevel: {
        type: String,
        enum : ['Junior', 'Intermidate','Mid-Level' , 'Senior', 'Executive'],
        default: 'Junior'
    },
    JobID: { 
        type: Number, 
        unique: true,
        required: true 
    },
    ApplicationInstructions: { type: String, required: true },
    ContactInformation: { type: String, required: true },
    YearsofExperienceRequired: { type: Number, required: true },
    EducationalBackground: { type: String, required: true },
    SpecificApplicationRequirements: { type: String, required: true },
    candiate : {type: Mongoose.Schema.Types.ObjectId, ref: 'candidateSchema'},
    company : {type: Mongoose.Schema.Types.ObjectId, ref: 'companySchema'},
    hiringManager : {type: Mongoose.Schema.Types.ObjectId, ref:'hiringManagerSchema'},
    SubDocument: candidateSchema,
    docArray: [candidateSchema],
    docObject : {candidateSchema},
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    toJSON: { getters: true } // Ensures getters are applied when converting to JSON
},{
    methods: {
        findDaysPassesAfterJobPosted (DateIntial,DateNow) {
            return Mongoose.model('jobModel').find({type: this.type}, DateIntial,DateNow)
        }
    }
});
   
jobSchema.virtual('FullCompanyAddress').get(function() {
    return `${this.CompanyName} , ${this.Location}`
})
     
jobSchema.virtual('formattedApplicationDeadline').get(function(){
    return this.ApplicationDeadline.toLocaleDateString('en-Us', {
        year: 'numeric',
        month: 'long',
        date: 'numeric'
    })
})
// Alias for JobDescription
jobSchema.path('JobDescription').alias('description');

// Alias for HiringManager
jobSchema.path('HiringManager').alias('manager');


const jobModel = Mongoose.Model('JobModel', jobSchema)


jobSchema.methods.formatTitle = function(){
    return this.JobTitle.toUpperCase()

}

jobSchema.methods.salaryToNumber = function(SalaryRange){
    return this.SalaryRange.ParseInt()
}

jobSchema.methods.formatDatePosted = function() {
    return this.JobPostingDate.toLocaleDateString()
}

jobSchema.methods.isExpired = function() {
    return new Date() > new Date(JobPostingDate)
}

jobSchema.methods.addRequiredSkill = function(hardSkill,softSkill) {
    this.RequiredSkills.push({hardSkills: hardSkill, softSkills: softSkill})
    return this.save()
}


jobSchema.static.findByJobTitle = function(jobTitle) {
    return this.find({JobTitle: new RegExp(jobTitle, 'i')})
}

jobSchema.static.findByLocation = function(location) {
    return this.find({Location: new RegExp(location, 'i') })
}

jobSchema.static.findByIndustry = function(industry) {
    return this.find({Industry : new RexExp(industry,'i') })
}

jobSchema.query.byEmploymentType = function(type) {
    return this.where('EmploymentType').equals(type)
}
jobShema.query.bySalaryRange = function(min,max) {
    return this.where('SalaryRange').gte(min).lte(max)
}

jobSchema.query.byYearsOfExpereince = function(years){
    return this.where('YearsofExperienceRequired').gte(years)
}

jobSchema.methods.findById = function(){
    return this._id.find({jobId: _id})
}
//const jobM = new jobModel({JobTitle : 'SOFTWARE DEVELOPER'})

const job = await job.findById(1);

console.log(job.formatPostingDate());
console.log(job.isExpired());
await job.addRequiredSkill('JavaScript', 'Problem-solving');

//Static Methods


const jobsByTitle = await Job.findByJobTitle('Software Engineer');
const jobsByLocation = await Job.findByLocation('New York');
const jobsByIndustry = await Job.findByIndustry('Technology');

//Query Helpers


 jobModel.find().byEmploymentType('Full Time').exec((err,jobs)=> {
    console.log(jobs)
 });

 jobModel.find().bySalaryRange(50000, 100000).exec((err,jobs)=> {
    console.log(jobs)
 });

 jobModel.find().byExperience(3).exec((err,jobs)=> {
    console.log(jobs)
 });

console.log(job.formatTitle())


const createJob = async(jobId)=>{
    try {

            if (jobId >= 1 && jobId !== null) {
                // Check if a job with the given jobId already exists
                const existingJob = await jobModel.findById(jobId);
                if (existingJob) {
                    console.log('Job already created with this ID');
                    return;
                }
    
                // Create a new job document
                const job = new jobModel({
                    _id: jobId, // Assuming jobId is the unique identifier for the job
                    name: 'abebe',
                    JobTitle: 'Health',
                    JobDescription: 'Provide healthcare services',
                    CompanyName: 'Health Corp',
                    Location: 'Addis Ababa',
                    EmploymentType: [{ type: 'Full Time' }],
                    SalaryRange: { min: 5000, max: 10000 },
                    RequiredSkills: [
                        { hardSkills: 'Medical Degree', softSkills: 'Communication' }
                    ],
                    Qualifications: ['Certified', 'Degree'],
                    JobPostingDate: new Date(),
                    JobPostingExpiration: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from now
                    HiringManager: 'John Doe',
                    NumberofOpenPositions: 3,
                    ApplicationDeadline: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 days from now
                    PerksandBenefits: [{ body: 'Health Insurance' }],
                    CompanyOverview: 'Leading healthcare provider',
                    InterviewProcess: 'Initial screening, technical interview, HR interview',
                    RelocationAssistance: 'Yes',
                    EqualOpportunityStatement: 'We are an equal opportunity employer',
                    Industry: 'Health',
                    SeniorityLevel: 'Junior',
                    JobID: jobId, // Assuming jobId is used for JobID field as well
                    ApplicationInstructions: '1. Sign up on our website, 2. Submit your resume, 3. Complete the online assessment',
                    ContactInformation: 'hr@healthcorp.com',
                    YearsofExperienceRequired: 2,
                    EducationalBackground: 'Medical Degree',
                    SpecificApplicationRequirements: 'Must be certified to practice medicine in the country'
                });
    
                // Save the job document to the database
                await job.save();
    
                console.log('Job created successfully:', job);
                return job;
            } else {
                console.log('Invalid job ID');
            }
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };
    
createJob(1)

module.exports = createJob



const getSingleJob = async (jobId) => {
    try {
        if (jobId >= 1 && job !== null) {
            // Check if a job with the given jobId already exists
            const existingJob = await jobModel.findById(jobId);
            if (existingJob) {
                console.log('Job found in database with this ID:', existingJob);
                return existingJob;
            } else {
                console.log('Job not found in database with this ID:', jobId);
                return null;
            }
        } else {
            console.log('Invalid job ID');
            return null;
        }
    } catch (error) {
        console.error('Error searching for that specific job:', error);
        throw error; // Re-throw the error to handle it appropriately in the calling code
    }
};

// Example usage
getSingleJob(1).then(job => {
    if (job) {
        console.log('Job details:', job);
    } else {
        console.log('No job found with the provided ID.');
    }
}).catch(error => {
    console.error('Error occurred while fetching the job:', error);
});

module.exports = getSingleJob


const getAllJobs = async () => {
    try {
        const Jobs = await jobModel.find({});
         // Check if a jobs have at least one job  exists
        if (Jobs.length > 0) {
            console.log('Job found in database ', Jobs);
            return Jobs;
        } else {
            console.log('Jobs not found in database');
            return []; 
        }
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        throw error; // Re-throw the error to handle it appropriately in the calling code
    }
};

// Example usage
getAllJobs(1).then(jobs => {
    if (jobs.length) {
        console.log('Job details:', jobs);
    } else {
        console.log('No job found with in this database.');
    }
}).catch(error => {
    console.error('Error occurred while fetching the jobs:', error);
});

module.exports = getAllJobs;





const updateJob = async (jobId, Jobs, Job) => {
    try {
        // First, before updating a specific job, check if the id is positive or greater than 0
        if (jobId >= 1 && Jobs !== null) {
            // Next, check if the id we want to update exists in the database
            if (jobId <= Jobs.length) {
                // Then, get the target job to update
                const targetJob = await jobModel.findById(jobId);
                // If it's in the database, then perform the update
                const updatedJob = await jobModel.findByIdAndUpdate(jobId, Job, {
                    new: true
                });
                console.log(updatedJob);
                return updatedJob;
            } else {
                // Log an error if the id doesn't exist within the database
                console.error('The id does not exist within the database');
            }
        } else {
            console.log('The id is negative or the database is null');
        }
    } catch (error) {
        console.error('Error occurred while updating a specific job:', error);
    }
}

updateJob(1, { JobTitle: 'Human Resource' });


updateJob(1, jobsCollection, { JobTitle: 'Human Resource' });

module.exports = updateJob



const deleteJob = async (jobId) => {
    try {
        if (jobId >= 1) {
            // Assuming jobModel is defined elsewhere
            const deletedJob = await jobModel.findByIdAndDelete(jobId);
            if (deletedJob) {
                console.log('Job deleted successfully:', deletedJob);
                return deletedJob;
            } else {
                console.error('Job not found with given ID:', jobId);
                return null;
            }
        } else {
            console.error('Invalid job ID:', jobId);
            return null;
        }
    } catch (error) {
        console.error('Error occurred while deleting the job:', error);
        return null;
    }
}

// Example usage
deleteJob(1);

module.exports = deleteJob






// now perform strong queries

//Date Posted , Experince Level , Company, Remote or Location , Industry

// 1. Define the Filters
// Let's consider the filters:
// Salary range (minSalary and maxSalary)
// Job posting date range (startDate and endDate)
// Number of open positions (minPositions and maxPositions)
// Company type
// Employment type
// Seniority level


//2. Create the Query Object Dynamically

const createQueryObject = async (filters) => {
    let query = jobModel.find()

// Salary range (minSalary and maxSalary)
    if (filters.minSalary !== undefined && filters.maxSalary !== undefined){
        query = query.where('SalaryRange.min').gte(filters.minSalary)
        query = query.where('SalaryRange.max').lte(filters.maxSalary)
    }

// Job posting date range (startDate and endDate)

if(filters.startDate !== undefined && filters.endDate !== undefined){
    query = query.where('JobPostingDate').gte(new Date(filters.startDate)).lte(new Date(filters.endDate))
}

// Number of open positions (minPositions and maxPositions)

if(filters.minPositions !== undefined && filters.maxPositions !== undefined){
    query = query.where('NumberOfPositions').gte(filters.minPositions).lte(filters.maxPositions)
}

// Seniority level or Experince Level

if(filters.experinceLevel !== undefined){
    query = query.where('ExperinceLevel').in(filters.experinceLevel)
}

//Company Name
if(filters.companyName !== undefined){
    query = query.where('CompanyName').in(filters.companyName)
}

// Job Type

if(filters.jobType !== undefined){
    query = query.where('JobTitle').in(filters.jobType)
}
 //Industry // Company type
 if(filters.industryType !== undefined){
    query = query.where('Industry').in(filters.industryType)
}
//Remote or Location , 
if(filters.location !== undefined){
    query = query.where('Location').in(filters.location)
}
// Employment type
if(filters.employmentType !== undefined){
    query = query.where('EmploymentType').in(filters.employmentType)
}

if (filters.limit !== undefined) {
    query = query.limit(filters.limit);
}

if (filters.sort !== undefined) {
    query = query.sort(filters.sort);
}

if (filters.select !== undefined) {
    query = query.select(filters.select);
}



try {
    const jobs = await query.exec()
    console.log('Filtered Jobs',jobs)
    return jobs
} catch (error) {
    console.error('Error Fetching the jobs',error)
    throw error
}

}

//Company Name// Job Type//
Industry // Company type//
 

const filters = {
    minSalary: 50000,
    maxSalary: 100000,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    minPositions: 1,
    maxPositions: 5,
    companyName : 'Google',
    industryType : 'Health',
    location :'Remote',
    jobType: 'Doctor',
    employmentType: 'Full Time',
    seniorityLevel: 'Mid-Level',
    limit: 10,
    sort: { JobPostingDate: -1 },
    select: 'name JobTitle SalaryRange'
};

createQueryObject(filters)
.then(jobs=> {
    console.log('Jobs Found That Match The Query')
    return jobs
}).catch(error=> {
    console.error('Error Finding The Jobs Bases on The Query',error)
    throw error
})


// now perform strong aggregation


// now perfrom strong population
//Populate:
//Fetching Candidates for Job Posts:

// Suppose each job post in your system can have multiple candidates who have applied for the position. By using populate, you can fetch a job post along with all the associated candidate details, such as their names, contact information, and application status.
// Retrieving Company Information:
const candidateInEachJobPost = jobModel.find()
// Use the find method to retrieve all job posts
  // Populate the 'candidate' field to fetch associated candidates
  .populate('candidate')
  // Execute the query
  .exec()
  .then(jobPosts => {
    // If successful, log the job posts with populated candidates
    console.log(jobPosts);
  })
  .catch(err => {
    // If an error occurs, handle it
    // For example, you can log the error or return an error response
    console.error(err);
  });

  console.log(candidateInEachJobPost)
// //If your job post schema includes a reference to a company collection or schema, you can use populate to fetch detailed information about the company associated with each job post, including its name, industry, location, and any additional details.

const companyDetailAsscoiatedWithJobPost =  jobModel.find()
.populate('company')
.exec()
.then(jobPosts => {
    console.log(jobPosts)
}).catch(error =>{
    throw error
})

console.log(companyDetailAsscoiatedWithJobPost)
// Displaying Hiring Manager Details:

//If the hiring manager for each job post is stored as a separate document or collection, populate can be used to fetch the hiring manager's information, such as their name, contact details, and job title, along with the job post.
const hiringManagerDetailAsscoiatedWithJobPost =  jobModel.find()
.populate('hiringManager')
.exec()
.then(jobPosts => {
    console.log(jobPosts)
}).catch(error =>{
    throw error
})


console.log(hiringManagerDetailAsscoiatedWithJobPost)



//Aggregation:
//Generating Job Post Statistics:
// Aggregation can be used to compute various statistics and metrics related to job posts,
//  such as the total number of job posts in each industry, 
//the average salary range for different seniority levels,
//   or the distribution of job posts based on location.

const jobPostStatics = jobModel.aggregate([
    
    {
     $group : {
        _id : 'Industry',
        totalNumberOfJobPosts : {sum : 1},
      }
    },
    {
        $group : {
            
            _id : 'Seniortiy Level',
            averageMinSalary : { $avg : 'SalaryRanage.min'},
            averageMaxSalary : {$avg : 'SalaryRange.max'},  
        }
    },
    {
        $group: {
            _id : 'Location',
            totalNumberOfJobPosts : {sum : 1}, 
        }
    },
    {
        $sort : {totalNumberOfJobPosts : -1},
        $sort : {_id : 1}
    }
   
]).exec((result, error)=>{
    if(result) {
        console.log(result)
        return result
    }
    else {
        console.error(error)
        throw error
    }
})

console.log(jobPostStatics)
// Calculating Application Metrics:
// Aggregation can help in analyzing application data associated with job posts,
//  such as the number of applications received per day, the average number of applications per job post,
//   or the distribution of applications across different employment types.


//Identifying Trends Over Time:
// By aggregating job post data over time periods (e.g., months or quarters),
//  you can identify trends and patterns in job postings, 
//  such as seasonal variations in hiring demand, changes in salary ranges over time,
//   or shifts in the popularity of specific industries.

// These are just a few examples of how you can leverage populate and aggregation with your
//  job post schema or model to enhance data retrieval and analysis capabilities within your application. Depending on your specific requirements and use cases, there may be additional opportunities to leverage these features effectively.
 /**
 * name:String,
    _id: Number,
    JobTitle: String,
    JobDescription: String,
   
    CompanyName: String,
    Location: String,
   
    EmploymentType : [{type:String, default:'Full Time'}],
   
    SalaryRange: Number,
   
    RequiredSkills: [{
        hardSkills:String,
        softSkills: String,
        default:''
    }],
   
    Qualifications: {
        type:Array,
        default:''
    },
   
    JobPostingDate: Date,
   
    JobPostingExpiration: Date,
   
    HiringManager: String,
   
    NumberofOpenPositions: Number,
   
    ApplicationDeadline: {
        type: String,
        default: Date.now()
    },
    PerksandBenefits: [{ body: String, default: null}],
   
    CompanyOverview: String,
   
    InterviewProcess: String,
   
    RelocationAssistance: String,
   
    EqualOpportunityStatement: String,
   
    Industry: String,
   
    SeniorityLevel: {
        type:String,
        default: 'Junior'},
    JobID: Number,
   
    ApplicationInstructions: String,
   
    ContactInformation: String,
   
    YearsofExperienceRequired: Number,
   
    EducationalBackground: String,
   
    SpecificApplicationRequirements: String,
   
    SubDocument: candidateSchema,
   
    docArray: [candidateSchema],
   
    docObject : {candidateSchema},

    
 */

const document = new jobModel()
document._id = 1

document._id instanceof Mongoose.Types.ObjectId /// returns true

await document.save()


jobSchema.path('_id')