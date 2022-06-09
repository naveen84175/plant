const mongoose = require('mongoose')
const user = require('../model/user')
const plant = require('../model/plant')
const note = require('../model/notes')


const DB = 'mongodb+srv://plantifier2020:EIU4zaFpFBHu9niU@cluster0.casik.mongodb.net/plantifier?retryWrites=true'.replace('<PASSWORD>', process.env.PASSWORD)
mongoose.connect(DB,
    { useNewUrlParser: true }).then(() => {
        console.log('Connected to the database Successfully')
    })

async function flushAll() {

    try {

        await user.deleteMany()
        await plant.deleteMany()
        await note.deleteMany()

    } catch (err) {

    }

}
flushAll()