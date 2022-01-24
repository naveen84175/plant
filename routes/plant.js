const express = require('express')
const Router = express.Router()
const plantcontroller = require('../controller/plantController')
const multer = require('multer')
const upload = multer()

Router.use(upload.array())

// Router.use(upload.array)

Router.post('/createPost', plantcontroller.createPost)
Router.post('/getPost', plantcontroller.getPost)
Router.get('/getMyPosts', plantcontroller.getMyPosts)
Router.get('/getAllPosts', plantcontroller.getAllPosts)
Router.delete('/deletePost', plantcontroller.deletePost)


module.exports = Router