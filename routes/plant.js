const express = require('express')
const Router = express.Router()
const plantcontroller = require('../controller/plantController')
const multer = require('multer')
const upload = multer()

Router.use(upload.array())

// Router.use(upload.array)
Router.post('/getDetails',plantcontroller.getDetails)
Router.post('/createPost' , plantcontroller.createPost)

Router.get('/getAllPosts',plantcontroller.getAllPosts)
Router.delete('/deletePost', plantcontroller.deletePost)


module.exports = Router