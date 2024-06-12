const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const bidSchema = new mongoose.Schema({

   // amount, auctionId,bidderId,createdAt
    BidID: {
        type: Number,
        required: true,

    },
    ItemID: {
        type: Number,
        required: true,
    },
    ItemType: {
        type: String,
        required: true,
        default: 'building'

    },
    UserID: {

    },
    BidAmount: {
        type: Number,
        required: true,
        default: 100

    },
    auctionId : {
        type: Number,
        required: true,
        default: 100
    },
    paymentId: {
        type: Number,
        required: true,
        default: 100
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    bidDeadLine: {
        type: Date,
        required: true,
        default: Date.now
    },
    AutoBidEnabled:{
      type : Boolean,
      default:true
    },
    MaximumBidAmount: {
        type: Number,
        required: true,
        default: 100
    },
    minimumBidAmount: {
        type: Number,
        required: true,
        default: 1
    },
    BidStatus: {
        type : String,
        required: true,
        enumerator: ['pending','accepted','rejected','expired','withdrawn' ]


    },
    
    BidSource: {

    },
    Comment: {

    }
    
})

const Bid = mongoose.model('Bid', bidSchema)
