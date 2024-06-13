const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const auctionSchema = mongoose.Schema({
    AuctionID: {
        type : Number,
        required: true,
        default : 1
  
    },
    Items: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    StartTime:{
        type : Date,
        required: true,
        default : Date.now
    },
    EndTime: {
        type : Date,
        required: true,
        default : Date.now
    },
    AuctionStatus: {
        type : [String],
        required: true,
        enum : ["not started","ongoing", "completed", "canceled"],
    },
    AuctionName: {
        type : String,
        required: true,
    },
    Description:{
        type : Number,
        required: true,
    },

})
const Auction = mongoose.model('Auction',auctionSchema)
export default Auction