const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//const Schema = mongoose.Schema



const userSchema = new mongoose.Schema({
    user_id : {
        type : Number,
        required: true,
        default : 1
    },
    first_name : {
        type : String,
        required : true,       
    },
    last_name : {
        type: String,
        required : true
    },
    age : {
        type: Number,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enumerator : ['Auctioner' , 'Bidder']
    },

    password_hash : {
      type : String,
      required: true,
      unique : true,

    },
    date_of_birth : {
        type : Date,
        required : true,

    },
    joining_date : {
        type : Date,
        required : true,
        default : Date.now
    }

//     user_id (primary key)
// username
// email
// password_hash
// first_name
// last_name
// date_of_birth
// joining_date


})

const User = mongoose.model('User', userSchema)


userSchema.pre('save', async()=> {
    if(this.isModified(this.password)){
      bcrypt.genSaltSync(10, (err,salt) => {
        if(err) {
            return next(err)
        } 
        bcrypt.hash(this.password, salt, (err,hash)=>{
            if(err) {
                return next(err)
            } else {
                this.password = hash
                return next(null,this)
            }
        })
      })
    }
    return next(null,this)
})

userSchema.pre('save' , async(next)=> {

    if(!this.New) {
        return next
    }
    try {
      const lastUser = await mongoose.model('User').findOne({},{},{sort : {'joining_date' : -1}, limit: 1}) 
      this.user_id = lastUser ? lastUser.user_id + 1 : 1
      next()
    } catch (error) {
        return next(err)
    }
} )



userSchema.methods.generateHash = function(password) {
   const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
   return hash
}

userSchema.methods.comparePasswords = function(candidatePassword,next) {
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=> {
        if(err) {
            return next(err)
        }  else {
           next(null,isMatch)
        }
    })
   

}

userSchema.methods.isPasswordValid = function(password) {
    bcrypt.compareSync(password, this.hash)
}