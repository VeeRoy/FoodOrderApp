const mongoose = require('mongoose')

require('dotenv').config()
const dbURL = process.env.dbURL 


function dbConnect() {
    mongoose.connect(dbURL)

    mongoose.connection.on('connected', ()=>{
        console.log('connection to DB successful')
    })

    mongoose.connection.on('error', (err) =>{
        console.log('error connecting to DB', err)
    })
}

module.exports = { dbConnect }