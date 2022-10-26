const express = require('express')
const order = require('../model/orderModel')

const server = express.Router()

server.get('/', async(req, res) =>{
    const session = req.sessionID
    const del = await order.find({
        sessionID: session
    })
    res.render('orderSlip', { del })
})

module.exports = server