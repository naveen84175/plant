const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const { promisify } = require('util');




const SignupToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {

  try {

    const Signup = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = SignupToken(Signup._id);

    res.status(201).json({
      Signup,
      token,
    });

  } catch (err) {
      res.status(400).json({
        status:'fail',
        message:err.message
      })
  }

}

exports.login = async (req, res) => {

  try {
    let {email , password}  = req.body;
    if(!email || !password)
      return res.status(200).json({
        status:'success',
        message:'Please provide email or password'
      })

      const user = await User.findOne({ email }).select('+password')

      if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(404).json({
              status:'fail',
              message:'not user found with this email or incorrect password'
            })
    }

   let token = SignupToken(user._id)

    res.status(200).json({
      status:200,
      token
    })

  } catch (err) {
    res.status(400).json({
      status:'fail',
      message:err.message
    })
  }

}