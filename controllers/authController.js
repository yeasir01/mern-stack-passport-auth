const db = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendMail } = require('../config/nodeMailer')

const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const checkEmail = email => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(email)
}

module.exports = {
    login: (req, res) => {
        if (req.isAuthenticated()) {
            let { firstName, lastName, id } = req.user;
            res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id, isAuthenticated: true })
        } else {
            res.status(401).json({success: false, message: "Incorrect email or password"})
        }
    },
    logout: (req, res) => {
        if (req.isAuthenticated()) {
            req.logout()
            res.status(200).json({ success: true, message: "Successfully logged out" })
        } else {
            res.status(400).json({ success: false, message: "No active sessions" })
        }
    },
    register: (req, res) => {
       let { email, password, firstName, lastName } = req.body;

       if (!email || !password || !firstName || !lastName) {
           return res.status(400).json({ success: false, message: "Please complete all required fields" })
       }

       if (password.length < 6) {
           return res.status(400).json({ success: false, message: "Password must be greater than 6 characters" })
       }
       
       if (!checkEmail(email)) {
           return res.status(400).json({ success: false, message: "Please enter a valid email" })
       }

       db.User.findOne({ email: email })
       .then( user => {
        
           if (user) return res.status(400).json({ success: false, message: "That email already exists, please choose another" })

           let newUser = new db.User({
               email,
               password,
               ...req.body
           })

           bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash( newUser.password , salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    
                    newUser.save()
                    .then(() => {
                        res.status(201).json({success: true, message: "User successfully created!"})
                    })
                    .catch( err => {
                        res.status(500).json({success: false, message: "Server Issue: Unable to create user!"})
                    })
                })
            })
       })
        .catch( err => {
            res.status(500).json({success: false, message: "Internal server issue!"})
        })
    },
    checkAuthState: (req, res) => {
        if (req.isAuthenticated()) {
            let {firstName, lastName, id} = req.user;
            res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id, isAuthenticated: true })
        } else {
            res.status(401).json({success: false, message: "Login Required!"})
        }
    },
    forgotPassword: (req, res) => {
        let { email } = req.body;
        let token = crypto.randomBytes(40).toString('hex');
        let expiration = Date.now() + (1000 * 60 * 15);
        
        db.User.findOne({ email: email })
        .then( user => {

            if (!user) {
                res.status(422).json({success: false, message: "User with this email was not found!"})
                
            } else {
                db.User.findOneAndUpdate({_id: user._id}, {$set:{resetPassToken: token, tokenExpiration: expiration}}, {new:true})
                .then( ({email, resetPassToken}) => {
                    sendMail(email, resetPassToken)
                    res.status(200).json({success: true, message: "Please check your email, link will expire in 15 min!"})
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
                res.status(422).json({success: false, message: "Password reset link has expired!"})

            } else {
                bcrypt.genSalt(10, (err, salt) => {
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