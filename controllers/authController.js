const db = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendMail } = require('../utils/nodeMailer');

const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const validEmail = email => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(email)
}

//requires a minimum of eight characters, at least one letter and one number
const validPassword = password => {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password)
}

module.exports = {
    login: (req, res) => {
        //Never send the password back to the client
        let { firstName, lastName, id } = req.user;
        res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id, isAuthenticated: true });
    },
    logout: (req, res) => {
        req.logout()
        res.status(200).json({ success: true, message: "Successfully logged out" })
    },
    register: (req, res) => {
       let { email, password, firstName, lastName } = req.body;

       if (!email || !password || !firstName || !lastName) {
           res.status(400).json({ success: false, message: "Please complete all required fields." })
       }

       if (!validPassword(password)) {
           res.status(400).json({ success: false, message: "Password requires a minimum of eight characters, at least one letter and one number" })
       }
       
       if (!validEmail(email)) {
           res.status(400).json({ success: false, message: "Please enter a valid email address." })
       }

       db.User.findOne({ email: email })
       .then( user => {
        
           if (user) {
               res.status(400).json({ success: false, message: "That email is already in use." })
           }
           
           let newUser = new db.User({
               email,
               password,
               ...req.body
           })

           bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash( newUser.password , salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    
                    newUser.save()
                    .then(() => {
                        res.status(201).json({success: true, message: "Account successfully created."})
                    })
                    .catch( err => {
                        res.status(500).json({success: false, message: "Server Issue: Unable to create account!"})
                    })
                })
            })
       })
        .catch( err => {
            res.status(500).json({success: false, message: "Internal server issue!"})
        })
    },
    authStatus: (req, res) => {
        let {firstName, lastName, id} = req.user;
        res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id, isAuthenticated: true })
    },
    forgotPassword: (req, res) => {
        let { email } = req.body;
        let token = crypto.randomBytes(40).toString('hex');
        let expiration = Date.now() + (1000 * 60 * 30);
        
        db.User.findOne({ email: email })
        .then( user => {

            if (!user) {
                res.status(422).json({success: false, message: "No user with that email found!"})
                
            } else {
                db.User.findOneAndUpdate({_id: user._id}, {$set:{resetPassToken: token, tokenExpiration: expiration}}, {new:true})
                .then( user => {

                    sendMail({
                        template: "password-reset",
                        name: `${capitalize(user.firstName)}  ${capitalize(user.lastName)}`,
                        token: user.resetPassToken,
                        email: user.email
                    })
                    
                    res.status(200).json({success: true, message: "A password reset link was sent. Click the link in the email to create a new password."})
                })
            }
            
        })
        .catch( err => {
            res.status(400).json({success: false, message: "The server is unable to process your request at this time!"})
        })
        
    },
    resetPassword: (req, res) => {
        let { token, password } = req.body;

        db.User.findOne({resetPassToken: token})
        .then( user => {
            
            if (!user) {
                res.status(422).json({success: false, message: "Password reset link is either invalid or expired!"})

            } else if (user.tokenExpiration < Date.now()) {
                res.status(422).json({success: false, message: "This password reset link has expired!"})

            } else if (!validPassword(password)){
                res.status(400).json({ success: false, message: "Password requires a minimum of eight characters, at least one letter and one number" })

            } else {
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err;
            
                    bcrypt.hash( password , salt, (err, hash) => {
                        if (err) throw err;
                        
                        db.User.findOneAndUpdate({_id: user._id}, {$set:{password: hash}, $unset:{resetPassToken: "", tokenExpiration: ""}})
                        .then(() => {
                            res.status(200).json({success: true, message: "Password has been sucessfully changed!"})
                        })
                    })
                })
            }
            
        })
        .catch( err => {
            res.status(400).json({success: false, message: "The server is unable to process your request at this time!"})
        })
    }
}