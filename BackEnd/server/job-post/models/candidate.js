const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')


const candidateSchema = new mongoose.Schema({
    // Personal Information
    name: { type: String, required: true },
    sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    
    // Educational Background
    education: { type: String, required: true },
    
    // Skills
    skills: [{ type: String }],
    
    // Contact Information
    email: { type: String, required: true },
    
    // Documents
    resume: { type: String, required: true },
    coverLetter: { type: String },

    // Additional Information
    contactInformation: { type: String },
    applicationStatus: { type: String, enum: ['Applied', 'Under Review', 'Rejected', 'Selected'] }
});

const Candidate = mongoose.model('Candidate', candidateSchema)

export default Candidate




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

