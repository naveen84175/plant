const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const { promisify } = require('util');
const otpg = require('otp-generator')
const email = require('../utils/email')


const SignupToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {

  try {
    let otp = otpg.generate(5 ,{digits:true, upperCaseAlphabets: false, specialChars: false  })

    let user = await User.findOne({email:req.body.email,phone:req.body.phone})
    // if(!user)
    const signup = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      otp
    });

    // const token = SignupToken(signup._id);

    
 let info =  await email(otp,process.env.SMTP_USER_ID , process.env.SMTP_USER_PASS,req.body.name,req.body.email)

    if(info.accepted.length>=1 || info.response.includes('Great success'))
    res.status(201).json({
        message:'An otp has been sent to your registered email id Please check and verify'
    });

    else 
    res.status(400).json({
      message:'Error sending mail! please try again'
    })


  } catch (err) {
      res.status(400).json({
        status:'fail',
        message:err.message
      })
  }

}

exports.verifyOtp = async(req,res)=>{
  try {

    let {otp,email} = req.body;
    let user = await User.findOne({email})

    if(otp!==user.otp){
      res.status(404).json({
        status:'Fail',
        message:'Invalid otp'
      })
  }
else
{
    const token = SignupToken(user._id);
    res.status(200).json({
      status:'success',
      token
    })
}
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