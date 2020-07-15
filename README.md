# :closed_lock_with_key: MERN Stack Passport Auth Boilerplate

## About This Project

This is boilerplate code for a MERN stack authentication system using PasspportJS. The intent of this project is to create an easy to use, performant login system that can be utilized for any member based web applcation system.

This project is open source (code contributions welcome). The intended is for projects that do not require redux. It uses React's built in Context API for managing auth state.

## Project Goals
1) Security
2) Maximum flexibility
3) Small footprint w/minimal dependencies
4) Use all modern functional based components & hooks
5) Modern JS ES6 Syntax
6) No Redux (due to overhead)
7) Reduce or eliminate all unnecessary re-renders

## Technologies (Server-Side)
- Express
- Express-Sessions
- Passport
- Passport-Local
- Bcrypt
- Mongoose & MongoDB
- Connect-Mongo
- Nodemailer

## Technologies (Client-Side)
- React
- Material-UI
- Axios (for browser support)

## Starting the app locally
1) Download or clone this repository.
2) Create a .env file in the root directory.
3) Paste the following into the .env file.

```
SESSION_SECRET = yourCustomSuperSecertPassPhraseHere
EMAIL_USER = yourEmailHere
EMAIL_PASSWORD = yourEmailPasswordHere
```

Start by installing front and backend dependencies. While in the root directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server <http://localhost:5000> should intercept any AJAX requests from the client.


## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.