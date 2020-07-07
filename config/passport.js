const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

passport.use( new LocalStrategy( {usernameField: 'email', passwordField: 'password'},
    ( email, password, done ) => {
        db.User.findOne({ email: email }, (err, user) => {
            
            if (err) return done(err); 
            
            if (!user) {
                return done(null, false, { message: 'User does not exsits!' });
            }
            
            try {
                if ( bcrypt.compareSync(password, user.password) ) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password!' });
                }
            } catch (err) {
                return done(err)
            }

        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
    });
    
passport.deserializeUser((id, done) => {
    db.User.findById({_id: id}, (err, user) => {
        
        let response = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        done(err, response);
    });
});

module.exports = passport;