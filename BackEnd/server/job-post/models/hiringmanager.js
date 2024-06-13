const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')

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

const HiringManager = mongoose.model('HiringManager', hiringManagerSchema)

export default HiringManager



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



