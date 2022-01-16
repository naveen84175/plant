const mongoose = require('mongoose')


const notesSchema = new mongoose.Schema({

    note:{
        type:String,
        required:true,
        default:""
    },
     userid:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    postid:{
        type:mongoose.Schema.ObjectId,
        ref:'Plant',
        required:true
    }

})

const Note = new mongoose.model('Note',notesSchema)

module.exports = Note