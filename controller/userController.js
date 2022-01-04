const User = require('../model/user')

exports.getAllUsers = async(req,res)=>{
    try {
        
        let users = await User.find();

        res.status(200).json({
            stauts:'success',
            data:users
        })

    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getUser = async(req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data:user
        })
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status:'success'
        })

    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.updateUser = async(req,res)=>{
    try {
        
        let user =await User.findByIdAndUpdate(req.params.id,req.body,{new:true})   

            res.status(200).json({
                status:'success',
                data:user
            })
            

    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}