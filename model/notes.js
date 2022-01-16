const mongoose = require('mongoose')


const notesSchema = new mongoose.Schema({

    note:{
        type:String,
        required:true,
        default:""
    },
     user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Plant',
        required:true
    }

})

const Note = new mongoose.model('Note',notesSchema)

module.exports = Note