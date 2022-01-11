const express = require('express')
const Router = express.Router()
const plantcontroller = require('../controller/plantController')


// Router.use(upload.array)
Router.post('/getDetails',plantcontroller.getDetails)


module.exports = Router