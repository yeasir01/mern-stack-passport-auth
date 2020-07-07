const db = require('../models');
const bcrypt = require('bcrypt');

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
       }).catch( err => {
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
    }
}