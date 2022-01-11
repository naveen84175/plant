const Plant = require('../model/plant')
const multer = require('multer')
const { exec } = require('child_process')
const { promisify } = require('util');
const execute = promisify(exec)
const axios = require('axios')
const fs = require('fs')
const formData  = require('form-data');
var rem = 495;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split('/')[1])
  }
})

const uploads = multer({ storage }).array('plantImage',3)

exports.getDetails = async (req, res) => {
  
  uploads(req, res, async (err) => {
    try {
  
      let form = new formData();
  
      req.files.forEach(file=>{
        
        form.append('images' , fs.createReadStream(`./uploads/${file.filename}`))

      })
     
      // if(req.body.organs){
      //   console.log(req.body.organs)
      //   form.append('organs',req.body.organs)
      // }
    
      if(rem===0)
        return res.status(400).json({
          status:'fail',
          message:'Daily limit crossed'
        })

      let resp = await axios.post(
       `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANT_NET_KEYASAWA}`,//&images=https://www.thespruce.com/thmb/hwB-zf7UobrjQCDgzjbfDh-IwKE=/3000x2000/filters:no_upscale():max_bytes(150000):strip_icc()/get-to-know-the-feng-shui-money-plant-1275013-4-945a2575e67f4531a876343ab8329b11.jpg`,
       form, {
        headers: form.getHeaders()
      }
       )   

       rem =  resp.data.remainingIdentificationRequests
     
       res.status(200).json({
         status:'success',
         results:resp.data.results.length,
         data:resp.data.results
       })


      await execute('rm ./uploads/*').then(() => {
        console.log('files deleted successfully')
      })

    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      })
      await execute('rm ./uploads/*').then(() => {
        console.log('files deleted successfully')
      })
    }
  })//uploads


}//get details