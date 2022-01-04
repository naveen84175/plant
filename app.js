const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const app = express();


const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD)

mongoose.connect(DB,
    {useNewUrlParser: true}).then(()=>{
    console.log('Connected to the database Successfully')
})

app.use(morgan('tiny'))

app.get('/',(req,res)=>{
   
})


app.listen(3000,()=>{
    console.log('server is runnign at port 3000')
})