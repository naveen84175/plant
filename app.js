const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const multer = require('multer')
const upload = multer()
const cookieParser = require('cookie-parser')
const user = require('./routes/user')
dotenv.config({path:'./config.env'})
const app = express();



const DB = 'mongodb+srv://plantifier2020:<PASSWORD>@cluster0.casik.mongodb.net/plantifier?retryWrites=true'.replace('<PASSWORD>',process.env.PASSWORD)
mongoose.connect(DB,
    {useNewUrlParser: true}).then(()=>{
    console.log('Connected to the database Successfully')
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(upload.array())

app.get('/',(req,res)=>{
    res.send('helooo node')
})


app.use('/api/v1/user',user)

app.listen(process.env.PORT,()=>{
    console.log('server is running at port 3000')
})