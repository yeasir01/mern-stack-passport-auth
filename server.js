const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const setup = require('./config/setup.json')

const app = express();
const PORT = process.env.PORT || 5000;
const production = app.get('env') === 'production';

const MONGO_URL = production ? process.env.MONGODB_URI : 'mongodb://localhost/mern-pass-auth';

if (app.get('env') !== 'production') {
    let logger = require('morgan');
    require('dotenv').config();
    app.use(logger('dev'));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.enable('trust proxy');

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Sucessfully connected to MongoDB!'))
.catch(err => console.log('There was an issue connecting to MongoDB'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: production ? true : false,
        maxAge: setup.auth.sessionTime * 1000 * 60
    },
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection,
        ttl: setup.auth.sessionTime * 1000 * 60
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/api/auth"));

if (app.get('env') === 'production') {
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));