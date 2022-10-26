const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

const objectID = Schema.ObjectId

const userSchema = new Schema({
    id: objectID,
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)

const user = mongoose.model('users', userSchema)

module.exports = user