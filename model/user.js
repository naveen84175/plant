const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
    validate: validator.isEmail,
    unique:true
  },
  gender: {
    type: String,
    required: [true, 'A user must have a gender'],
    enum: ['male', 'female', 'others']
  },
  phone: {
    type: Number,
    required: [true, 'A user must have a phone number'],
    unique:true
  },
  role:{
    type:String,
    enum:['user','teacher','dev','admin']
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  }
})