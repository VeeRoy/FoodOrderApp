const express = require('express')
const passport = require('passport')
const userModel = require('../model/userModel')


const server = express.Router()
server.use(passport.initialize())

passport.use(userModel.createStrategy())

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

server.get('/login', (req, res) =>{
    res.render('login')
})

server.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) =>{
        res.redirect('/order');
    /* const user = await userModel.find({
        username:body.username
    }) */
})

server.get('/register', (req, res) =>{
    res.render('register')
})

server.post('/register', async (req, res) =>{
    const body = req.body
    
    userModel.register(new userModel({ username: body.username }), body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect("/login")
            });
        }
    })
   /* const user = await userModel.create({
        username: body.username,
        password: body.password
    })
    res.json({
        message: 'successful',
        user
    }) */
})



module.exports = server