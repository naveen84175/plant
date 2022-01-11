const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({

    plantName:[{
        type:String
    }],
    plantPhoto:[{
        type:String
    }],
    plantDescription:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})


