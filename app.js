var express = require ("express");
var hbs = require("hbs");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var mongoose = require("mongoose");
var User = require("./models/User");
mongoose.connect("mongodb://localhost/user_data");


var app = express();
app.use(require('express-session')({
	secret: 'I love Pakistan',
	resave: false,
	saveUninitialized: false
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/views'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//======
//ROUTES
//======

app.get('/',(req, res)=>{
	res.redirect('/home');
});
app.get('/home', (req, res)=>{
	res.render('home.hbs');
});
app.get('/signup', (req, res)=>{
	res.render('signup.hbs');
})
app.post('/signup', (req, res)=>{

})
app.get('/login', (req, res)=>{
	res.render('login.hbs');
});
app.get('/dashboard', (req,res)=>{
	res.render('dashboard.hbs');
});
app.get('/user', (req, res)=>{
	res.render('user.hbs');
});

app.get('/maps', (req, res)=>{
	res.render('maps.hbs');
});
app.get('/notifications', (req, res)=>{
	res.render('notifications.hbs');
});

app.listen(3000, ()=>{
	console.log("The server is running!");
});