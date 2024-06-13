const express = require('express')
const mongoDb = require('mongodb')
const mongoose = require('mongoose')

const notificationSchem = mongoose.Schema({
    notification_ID : {
        type: Number,
        required: true,
        default : 1
    },

    user_ID : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    message : {
        type: String,
        required: true,
        max_Length: 100
    },
    timeStamp : {
        type: Date,
        required: true,
        default : Date.now
    },
    read_status: {
        type: Boolean,
        required: true,
        default : 'false'
    },


})

const Notfication = mongoose.model('Notification',notificationSchem)

export default Notfication