const express = require('express')
const bodyParser = require('body-parser')
const { dbConnect }= require('./db')
const passport = require('passport')
const orderR = require('./routes/orderRoute')
const cart = require('./routes/cartRoute')
const auth = require('./routes/authenticate')
const connectEnsureLogin = require('connect-ensure-login');

require('dotenv').config()


const session = require('express-session');


const app = express()
const PORT = 4556
// dbConnect()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(passport.initialize()); 
app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));



app.set("view engine", "ejs")
app.set("views", "views")

app.use('/', auth)
// app.use('/order', connectEnsureLogin.ensureLoggedIn(), orderR)
app.use('/order', orderR)
app.use('/cart', connectEnsureLogin.ensureLoggedIn(), cart)


app.get('/', (req, res) =>{
    res.send('welcome to home page')
})



app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})