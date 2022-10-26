const mongoose = require('mongoose')
const Schema = mongoose.Schema

const objectID = Schema.ObjectId

const userSchema = new Schema({
    id: objectID,
    sessionID: {type: String},
    item: {type: Array}

})


const order = mongoose.model('cart', userSchema)

module.exports = order