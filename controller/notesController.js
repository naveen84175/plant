const Note = require('../model/notes')

exports.getAllNotes = async(req,res)=>{

    try {
        
        let userid = req.body.userid

        const data = await Note.find({user:userid})
      
        res.status(200).json({
            status:'success',
            data
        })


    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })

    }   

}