//Importing modules
const express = require('express');
const tour = require('./public/scripts/tour.json')



//Setup middleware
const app = express();
app.listen(process.env.PORT || 8000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));



//Routing
app.get('/', function(req, res){
    res.render('solar-system')
})


app.get('/tour/:name', function(req,res){
    res.render('tour', {info: tour[req.params.name], name: req.params.name})
})


app.get('/shop', function (req, res) {
    res.render('shop')
})


app.get('/shop/checkcout', function (req, res) {
    res.render('checkout')
})


// Twilio
const accountSid = 'AC79a1a3c005662307dab23608e30aaa66';
const authToken = '6e72e06be10c5a4764d012a8f8bf1cad';
const client = require('twilio')(accountSid, authToken);


app.post('/book', function(req, res){
    client.messages
        // from: '+16692894956',
        .create({
            body: 'Hey' + req.body.name + ", We have recieved your booking for going to " + req.body.planet + ". We'll get in touch with you soon.\nBooking ID: 202109007.\nThanks,\nGalactic Tour",
            messagingServiceSid: 'MG3035fbd0df5faea01bd3e78d97dd801c',
            to: req.body.phonenumber
        })
        .then(message => console.log(message.sid))
    .done();
})


// DB
const firebase = require("firebase/app");
const fs = require('firebase/firestore');
const admin = require("firebase-admin");
const serviceAccount = require("./firebase/firestore-key.json")

admin.initializeApp();
const db = admin.firestore();

app.post('/shop/checkout', function (req, res) {

})
