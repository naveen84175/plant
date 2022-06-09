const express = require('express')
const Router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const multer = require('multer')
const upload = multer()

Router.use(upload.array())
Router.post('/login', authController.login)
Router.post('/logout',authController.logout)
Router.post('/signup', authController.signup)
Router.post('/verifyOtp', authController.verifyOtp)
Router.route('/')
        .get(userController.getAllUsers)

Router.route('/updateProfileImage')
        .patch(userController.setProfilePicture)

Router.get('/getleaderboard', userController.getleaderBoard)
Router.get('/me/', userController.me)
Router.patch('/updateMe', userController.updateMe)
Router.route('/:id')
        .get(userController.getUser)
        .delete(userController.deleteUser)
        .patch(userController.updateUser)




module.exports = Router