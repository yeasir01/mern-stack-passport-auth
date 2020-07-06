const db = require('../models');
const bcrypt = require('bcrypt');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkEmail(email){
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email)
}

module.exports = {
    login: (req, res) => {
        if (req.isAuthenticated()) {
            let { firstName, lastName, id } = req.user;
            res.status(200).json({ success: true, user:`${capitalize(firstName)} ${capitalize(lastName)}`, id: id, isAuthenticated: true })
        } else {
            res.status(401).json({success: false, message: "Incorrect Username or Password!"})
        }
    },
    logout: (req, res) => {
        if (req.isAuthenticated()) {
            req.logout()
            res.status(200).json({ success: true, message: "Successfully Logged Out!" })
        } else {
            res.status(400).json({ success: false, message: "No Active Sessions" })
        }
    },
    register: (req, res) => {
       let { username, password, firstName, lastName, email } = req.body;

       if (!username || !password || !firstName || !lastName || !email) {
           return res.status(400).json({ success: false, message: "Please Complete All Required Fields!" })
       }

       if (password.length < 6) {
           return res.status(400).json({ success: false, message: "Password Must Be Greater Than 6 Characters!" })
       }
       
       if (!checkEmail(email)) {
           return res.status(400).json({ success: false, message: "Please Enter A Valid Email" })
       }

       db.User.findOne({ username: username })
       .then( user => {

           if (user) return res.status(400).json({ success: false, message: "Username Already Exists!" })

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
                        res.status(201).json({success: true, message: "User Successfully Created!"})
                    })
                    .catch( err => {
                        res.status(500).json({success: false, message: "Server Issue: Unable To Create User!"})
                    })
                })
            })
       }).catch( err => {
           res.status(500).json({success: false, message: "Internal Server Issue!"})
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