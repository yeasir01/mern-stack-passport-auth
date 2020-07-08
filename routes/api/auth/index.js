const express = require('express');
const router = express.Router();
const passport = require('../../../config/passport');
const AuthController = require('../../../controllers/authController');

router.route('/')
    // @route  GET /api/auth
    // @desc   GET user data once authenticated
    // @access Private
    .get(AuthController.checkAuthState)

router.route('/login')
    // @route  POST /api/auth/login
    // @desc   POST username & password & start a session
    // @access Public {successRedirect: "/dashboard"}
    .post(passport.authenticate('local'), AuthController.login)

router.route('/logout')
    // @route  GET /api/auth/logout
    // @desc   Clears login session
    // @access Private
    .get(AuthController.logout)
    
router.route('/register')
    // @route  POST /api/auth/register
    // @desc   POST new user to database
    // @access Public
    .post(AuthController.register)

router.route('/forgot')
    // @route  POST /api/auth/forgot
    // @desc   POST route to send a temp password
    // @access Public
    .post(AuthController.forgotPassword)

module.exports = router;