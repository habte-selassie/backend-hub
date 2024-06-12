const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const itemSchema = mongoose.Schema({
  itemName:{
     type: String,
    required: true,
    default: 'house'
  },
  itemDescription:{
    type: String,
    required: true,
    default: 'house'
  },
  itemCondition:{
    type: String,
    required: true,
    enum : ['new','used','refubrished'], 
    default: 'house'
  },
  itemQuantity: {
    type: Number,
    required: true,
    default: 100
  },
  startingPrice: {
    type: Number,
    required: true,
    default: 1
  },
  currentBid: {
    type: Number,
    required: true,
    default: 1000
  },
  reservePrice: {
    type: Number,
    required: true,
    default: 100000
  },
  buyNowPrice: {
    type: Number,
    required: true,
    default: 1009
  },
  bidIncrement: {
    type: Number,
    required: true,
    default: '5 %'
  },
  maximumBid: {
    type: Number,
    required: true,
    default: 100000
  },
  bidExpiry: {
    type: Date,
    required: true,
    default: Date.now
  },
  shippingCost: {
    type: Number,
    required: true,
    default: 1000
  },
  deliveryTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  shippingMethod: {
    type: [String],
    required: true,
    enum : ['car', 'motor','ship','fax'],
    default: 'fax'
  },
  paymentMethod: {
    type: [ String ],
    required: true,
    enum : ['credit card','paypal','crypto','stripe'],
    default: 'paypal'
  }, /// enum
  paymentSchedule: {
    type: Date,
    required: true,
    default: Date.now
  },
  returnPolicy: {
    type: String,
    required: true,
  },
  warranty: {
    type: String,
    required: true,
   
  },
  specialConditions: {
    type: String,
  }

})

const Item = mongoose.model('Item',itemSchema)