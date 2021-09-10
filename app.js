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