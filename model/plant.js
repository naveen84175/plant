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
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    this.timeStamp  = new Date().toLocaleTimeString('en', options)
    next()
})

const Plant  = new mongoose.model('Plant',plantSchema)

module.exports = Plant