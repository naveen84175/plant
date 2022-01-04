const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const user = require('./routes/user')
dotenv.config({path:'./config.env'})
const app = express();


const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD)
mongoose.connect(DB,
    {useNewUrlParser: true}).then(()=>{
    console.log('Connected to the database Successfully')
})
app.use(express.json( {limit:'10kb'} ))
app.use(morgan('tiny'))

app.get('/',(req,res)=>{
    res.send('helooo node')
})


app.use('/api/v1/user',user)

app.listen(process.env.PORT,()=>{
    console.log('server is running at port 3000')
})