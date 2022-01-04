const express = require('express')
const Router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')

Router.post('/login',authController.login)
Router.post('/signup',authController.signup)

Router.route('/')
        .get(userController.getAllUsers)
        
Router.route('/:id')
        .get(userController.getUser)
        .delete(userController.deleteUser)
        .patch(userController.updateUser)


module.exports = Router