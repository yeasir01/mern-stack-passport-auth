const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    let logger = require('morgan');
    require('dotenv').config();
    app.use(logger('dev'));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.enable('trust proxy');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-pass-auth', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Mongoose has sucessfully connected to MongoDB!')
}).catch(err => {
    console.log('There was an issue connecting to MongoDB')
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 //time to store cookies
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
};

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));