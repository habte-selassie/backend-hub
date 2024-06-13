const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')

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

const Company = mongoose.model('Company', companySchema)
export default Company

const companyDetailAsscoiatedWithJobPost =  jobModel.find()
.populate('company')
.exec()
.then(jobPosts => {
    console.log(jobPosts)
}).catch(error =>{
    throw error
})

console.log(companyDetailAsscoiatedWithJobPost)

