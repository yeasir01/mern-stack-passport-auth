const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
        let {firstName, lastName, id} = req.user;
        
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id })
    },
    logout: (req, res) => {
        if (req.isAuthenticated()) {
            req.logout()
            res.status(200).json({ success: true, message: "Successfully Logged Out!" })
        } else {
            res.status(400).json({ success: false, message: "No active sessions" })
        }
    },
    register: (req, res) => {
       let {username, password, firstName, lastName, email} = req.body;
       
       function checkEmail(){
           let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
           return regex.test(email)
       }

       if (!username || !password || !firstName || !lastName || !email) {
           return res.status(400).json({ success: false, message: "Please complete all required fields!" })
       }

       if (password.length < 7) {
           return res.status(400).json({ success: false, message: "Password must be greater than 6 characters!" })
       }
       
       if (!checkEmail()) {
           return res.status(400).json({ success: false, message: "Please enter a valid email" })
       }

       db.User.findOne({ username: username })
       .then( user => {

           if (user) return res.status(400).json({ success: false, message: "That user already exists!" })

           let newUser = new db.User({
               username,
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
                        res.status(500).json({success: false, message: "Server Issue: unable to create user!"})
                    })
                })
            })
       })
       .catch( err => {
           res.status(500).json({success: false, message: "Internal server issue!"})
       })
    },
    authenticate: (req, res) => {

        if (req.user.id) {
            let {firstName, lastName, id} = req.user;
            function capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id })
        } else {
            res.status(401).json({success: false, message: "Login required to access this content!"})
        }
    }
}