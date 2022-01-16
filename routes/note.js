const noteController = require('../controller/notesController')
const express = require('express')
const Router = express.Router()
const multer = require('multer')
const upload = multer()

Router.use(upload.array())

Router.get('/getAllNotes',noteController.getAllNotes)
Router.post('/createNote',noteController.createNote)
Router.patch('/updateNote' , noteController.updateNote)
Router.delete('/deleteNote',noteController.deleteNote)
module.exports = Router