const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
} else {
    let logger = require('morgan');
    require('dotenv').config();
    app.use(logger('dev'));
} 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-pass-auth', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})
.then(() => {
    console.log('Mongoose has sucessfully connected to MongoDB!')
})
.catch(err => {
    console.log('There was an issue connecting to MongoDB')
});

/* app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
}); */

app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));