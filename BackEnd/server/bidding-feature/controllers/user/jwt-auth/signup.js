const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const userModel = require('../../../models/user')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const cookies = require('cookie-parser')

const signUp  = async(req,res,next) => {
    try {
        const payload = {
           userID : req.body.userID,
           email : req.body.email
        }

       const options = {
            secretKey : '3962ydekhdsjsdldsdslj',
            expirationTime : '90 days'
        }

        
        const token = jwt.sign(payload, options.secretKey, { expiresIn : options.expirationTime}, { algorithm : 'RS256'}, (err,toke)=>{
            return token
        })

// Input Validation:
const { userName, email, password, age } = req.body

// Check if all required fields (e.g., name, email, password) are provided.
if(!userName || !email || !password || !age) {
    console.log('All required fields are not provided, please provide them');
    return res.status(400).json({
        error: ' please provide All required fields that are not provided'
    })
}
else {
    console.log('all required fields are provided')
     res.status(200).json({
        message : 'All Fields are provided lets go'
    })
}


// Validate the email format.
// Query the database to ensure the email is not already registered.
const emailSchema = Joi.string().email({ minDomainSegments : 2,
     tlds: { allow : ['com','net','gmail', 'hotmail', 'outlook']}
})

const emailValidation = emailSchema.validate(email)
if(emailValidation.error) {
console.log('Invalid Email Format')
return res.status(400).json({
    error : 'Invalid email format'
})
}

// Ensure the password meets security requirements (e.g., length, complexity).

if (password.length !== null || password.length < 8) {
   
    console.log('The provided password is either null or less than 8 please provide at least 8 letters')
    return res.status(400).json({
        error : 'The provided password is less than 8 characters'
    })
   
} else {
 res.status(200).json({
    message : 'The password is 8 character'
})
}
    
const existingUser = await userModel.findOne({ email })
if (existingUser) {
    console.log('The user email is already in the database, please use another email');
    return res.status(400).json({ error: 'The user email is already in the database, please use another email' });
  } else {

// Password Hashing:  
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Create and Save the User:
const newUser = await new userModel( {userName,email, password: hashedPassword, age })
await newUser.save()

  }

res.cookies("token", token, { httpOnly : true })
res.redirect('/user/sign up')

return res.status(200).send('Registration successful');



// Send Confirmation Email (Optional):
// Send a confirmation email to verify the user's email address.
        
    } catch (error) {
        console.error('Error during user sign-up , Error in registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });  
    }
}


const signIn  = async(req,res,next) => {
   try {
    const { email , password } = req.body
    const user = await userModel.findOne({ email : user.email})
    
    ////////// check if the user exists
    if(!user) {
        res.status(400).json({
            error : 'Please First Register before Login '
        })
    }  
        ///////// verify if the password is used during sing up also 
        const validPassword = await bcrypt.compare(password, user.password)
        if(validPassword) {
            res.status(400).json({ message : 'Incorrect Email and Password Combination'})
        }

        //// verfiy the jwt token created during user registration 
        const token = req.cookies.token
        if(!token) {
            return res.status(403).send("A token is required for authentication")
          }

      try {
            const decodedToken = jwt.verify(token, "my Secret Key")
                req.userId = decodedToken.id,
                req.email = decodedToken.email
               
                 // Continue to the next middleware or route handler
                return next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                  error: 'Token expired',
                });
              } else {
                 res.status(401).json({
                  error: 'Invalid token',
                });
              }
           }
        // Respond with user details and token       
     res.status(200).send({
            id: userModel.user_id,
            email : user.email,
            password : user.password,
            accessToken : token
     })
   } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
   }
}

const signOut = async(req,res,next) => {
    try {
        const { token } = req.body
        if(!token) {
            res.status(400).json({
                error: "refresh token is required"
            })
        }

        const user = userModel.findOne({ userToken : token })

        if(!user) {
            return res.status(403).send("Invalid user token")
        }

        user.userToken = null
        await user.save()
        
        res.clearCookie('userToken')
        res.status(200).json({
            message : "user logged out successfully"
        })

        res.redirect('/user/login')

    } catch (error) {
        res.status(500).json({ error : 'Internal Server Error'})
    }
}