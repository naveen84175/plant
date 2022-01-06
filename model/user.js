const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
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
  phone: {
    type: Number,
    required: [true, 'A user must have a phone number'],
    unique:true
  },
  role:{
    type:String,
    enum:['user','teacher','dev','admin','test']
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  /// Encryption
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

/// Instance methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};



const User = new mongoose.model('User',userSchema)
module.exports = User