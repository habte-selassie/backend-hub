const express = require('express')
const MongoDb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const joi = require('joi')
//const Schema = mongoose.Schema



const userSchema = new mongoose.Schema({
    user_id : {
        type : Number,
        required: true,
        validate : {
            validator : function(value){
                let userIdRegex = '^-([1-9][0-9]*|-[1-9][0-9]*)$'
                return userIdRegex
            },
            message : 'The User Id Must be Greater Than 0'
        },
        default : 1
    },
    first_name : {
        type : String,
        required : true,
        default : 'Habte Selassie',
        validate : {
            validator : function(value) {
                let first_name_reg = '^[A-Z][a-z]*$'
                return first_name_reg
            },
            message : 'The First Letter Should be Capital and Other Subsequent small letter'
        }

    },
    last_name : {
        type: String,
        required : true,
        validate : {
            validator : function(value) {
                let first_name_reg = '^[A-Z][a-z]*$'
                return first_name_reg
            },
            message : 'The First Letter Should be Capital and Other Subsequent small letter'
        },
        default: 'Fitsum'
    },
    age : {
        type: Number,
        required : true,
        default : '23',
        validate : {
            validator : function(value) {
                let age_reg = '^(?:1[8-9]|[2-9][0-9]|1[0-9]{2}|20[0-9]{2}|30[0-9]{2}|40[0-9]{2}|50[0-9]{2}|60[0-9]{2}|70[0-9]{2}|80[0-9]{2}|90[0-9]{2}|100)$'
                return age_reg
            },
            message : 'Age must be greater or equal to 18 and less than to 100'
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        default : 'habtuchelsea1000@gmail.com',
        validate : {
            validator : function(value){
                let emailRegex = '^(?:[a-zA-Z0-9._%+-]+@gmail\.com|a-zA-Z0-9._%+-+@yahoo\.com|a-zA-Z0-9._%+-+@outlookmail\.com|a-zA-Z0-9._%+-+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$'
                return emailRegex

            },
            message : 'Incorrect email your email must have @gmail.com,@yahoo.com or @outlookmail.com'
        }
    },
    username : {
        type : String,
        required: true,
        unique : true,
        validate : {
            validator : function(value){
                let usernameReg = '^[a-zA-Z][a-zA-Z0-9]{5,19}$'
                return usernameReg

            },
            message : 'Incorrect username your username must have minimum 6 charcters and maximum 20'
        }
    },
    password : {
        type : String,
       
        validate : {
            validator : function(value) {
                const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$#*].{8,}$'
                return passwordRegex
            },
            message : 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, and must be at least 8 characters long.',
        },
        required : [true,"user email password required"]

    },
    role : {
        type : String,
        required : true,
        enumerator : ['Auctioner' , 'Bidder'],
        default : 'Bidder'

    },

    password_hash : {
      type : String,
      required: true,
      unique : true,
      validate: {
        validator: function(value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        message: props => `${props.value} is not a valid password!`
      }
    },
    
    date_of_birth : {
        type : Date,
        required : true,
        validate : {
            validator : function(value){
                let dobRegex = '^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'
                return dobRegex
            },
            message : 'Date of Birth Must be Greather Than Now and Your Age must be 18 Years or Above'
        }

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

const userSchema = joi.object({

    user_id : joi.number().greater(0).min(1).default(1).required(),
   
    first_name : joi.string().trim().regex('^[A-Z][a-z]*$').min(2).max(30).required(),
   
    last_name : joi.string().trim().regex('^[A-Z][a-z]*$').min(2).max(30).required(),
   
    age : joi.number().min(18).max(100).default(18).required(),
   
    email : joi.string().
        email({ minDomainSegments : 2,
             tlds: { allow : ['com','net','gmail', 'hotmail', 'outlook']}
        }),
   
   
    username : joi.string().alphanum().min(3).max(30).required(),
   
    password : joi.string().min(8).max(30).pattern(new RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/')).required(),

   
    role : joi.string().trim().required().valid(['Auctioner', 'Bidder']).default('Bidder'),

    password_hash : joi.string().pattern('/^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/').required(),

    
    date_of_birth : joi.number().integer().min(1924).max(2024).default(2001).required(),
    
    joining_date : joi.date().iso().greater('13-6-2024').less('now').timestamp('javascript').required(),
})
.with('username', 'birth_year')
.xor('password','access_token')
.with('password', 'repeat_password')