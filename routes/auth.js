const express = require('express')
const Router = express.Router();

const authController = require('../controller/auth')

//GET     /login
Router.get('/login',authController.getLoginRoute)

// POST   /login
Router.post('/login', authController.postLoginRoute)

//GET    /register
Router.get('/register',authController.getRegisterRoute)


//POST  /register

Router.post('/register', authController.postRegisterRoute)


//GET      /logout
Router.get('/logout', authController.getLogoutRoute)


Router.get('/reset',authController.getResetRoute)


Router.post('/reset',authController.postResetRoute)

Router.get('/reset/:token',authController.getResetPassRoute)


Router.post('/changePassword',authController.postChangePass)



module.exports = Router