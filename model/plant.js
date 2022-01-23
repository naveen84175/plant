const mongoose = require('mongoose')

const imageResults = new mongoose.Schema({
        images:[String],
        score:Number,
        species:{
            scientificNameWithoutAuthor:String,
            scientificNameAuthorship:String,
            genus:{
                scientificNameWithoutAuthor:String,
                scientificNameAuthorship:String,
                scientificName:String
            },
            family:{
                scientificNameWithoutAuthor:String,
                scientificNameAuthorship:String,
                scientificName:String 
            },
            commonNames:[String],
            scientificName:String
        },
        gbif:{
            id:String
        }
})


const plantSchema = new mongoose.Schema({
    userUploadedImage:[String],
    wikkipediaLink:String,
    posts:[imageResults],
    timeStamp:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})


plantSchema.pre("save",function(next){
   
    this.timeStamp  = new Date().toISOString().split('T')[0].split('-').reverse().join('-')
    next()
})

const Plant  = new mongoose.model('Plant',plantSchema)

module.exports = Plant