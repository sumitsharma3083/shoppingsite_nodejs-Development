
const express = require('express')
const Router  = express.Router()
const accountController = require('../controller/accountAction')


const islogged  = require('../util/islogged')

Router.get('/personal',islogged,accountController.getPersonalview)
Router.post('/changepassword',accountController.postChangePasswordAction)
Router.post('/changeemail',accountController.postChangeEmailAction)


module.exports = Router
