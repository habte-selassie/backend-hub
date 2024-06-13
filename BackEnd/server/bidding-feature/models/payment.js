const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const paymentSchema = mongoose.Schema({
auctionItem: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true

},
bidder: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Bid',
    required: true
},
amount: {
    type : Number,
    required: true,
    min : 1,
    max: 1000,
    default : 1000

},
paymentMethod: {
    type : [String],
    required: true,
    enum : ['fiat','crypto','mobile-banking'],
    default : 'fiat'

},
paymentStatus: {
    type : String,
    required: true,
    enumerator: ['pending','accepted','rejected','expired','withdrawn' ],
    default: 'pending'

},
transactionId: {
    type : Number,
    required: true,
    default : 1000
},
paymentDate: {
    type : Date,
    required: true,
    default : Date.now
},
currency: {
    type : Number,
    required: true,
    enum : ['usd','eur','birr'],
    default : 'birr'
},
billingAddress: {
    type : String,
    required: true,
    default : 'Addis Ababa'
},
street: {
    type : String,
    required: true,
    default : 'Joseph Tito'
},
city:{
    type : String,
    required: true,
    default : 'Addis Ababa'
},
state: {
    type : String,
    required: true,
    default : 'Addis Ababa'
},
postalCode: {
    type : Number,
    required: true,
    default : 1000
},
country: {
    type : String,
    required: true,
    default : 'Ethiopia'
},
additionalInfo: {
    type : String,
}    
})

const Payment = mongoose.model('Payment',paymentSchema)
export default Payment