var express = require ("express");
var hbs = require("hbs");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var mongoose = require("mongoose");
var User = require("./models/User");
var tweet = require('./tweet.js');
var GeoCoder = require('./geocode.js');

mongoose.connect("mongodb://localhost/user_data");
const port = process.env.PORT || 3000;


var app = express();
app.use(require('express-session')({
	secret: 'I love Pakistan',
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/views'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//======
//ROUTES
//======

app.get('/',(req, res)=>{
	res.redirect('/home');
});
app.get('/home', (req, res)=>{
	res.render('app-home');
});
app.get('/signup', (req, res)=>{
	res.render('app-signup');
})
app.post('/signup', (req, res)=>{
	req.body.name
	req.body.email
	req.body.username
	req.body.password
User.register(new User({name: req.body.name, email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
	if (err){
		console.log(err);
		return res.render('app-signup');
	}
	passport.authenticate("local")(req, res, function(){
		res.redirect('dashboard');
	})
	
})
});

app.post('/tweet', (req,res)=>{
	console.log(req.body);
	tweet.get('search/tweets', {q: req.body.tweet || "sale,discount,off" , count: 20}, function(err, data, response){
	

	var tweets = data.statuses;
	res.send(tweets);	

});
});


app.post('/findfollowers', (req, res)=>{
	console.log(req.body);
	tweet.get('followers/list', { screen_name: req.body.follows },  function (err, data, response){
		var followers = data.users;
		res.send(followers);
	
});
});


app.post('/geocode', (req,res)=>{
	console.log(req.body,"8888");
	req.body.geocode
	//console.log(code);
	
	GeoCoder.geocode(req.body.geocode, function(err,resp){
		if(err){
			console.log(err)
		}else{
	console.log(resp[0].latitude);
	var code1 = {
				lat : resp[0].latitude,
				lon : resp[0].longitude		
					};	
	console.log(code1);
	res.json(code1);
	}
	// res.send(code1);	
	});
});

app.get('/login', (req, res)=>{
	res.render('app-login');
});
app.post("/login",passport.authenticate("local", {
	successRedirect: "/dashboard",
	failureRedirect: "/login"
}) ,(req, res)=>{

});
app.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});
app.get('/dashboard', isLoggedIn  ,(req,res)=>{
	res.render('dashboard', {
		//tweet: tweets
	});
});
app.get('/user', isLoggedIn ,(req, res)=>{
	res.render('user');
});

app.get('/maps', isLoggedIn ,(req, res)=>{
	res.render('maps');
});
app.get('/followers', isLoggedIn ,(req, res)=>{
	res.render('followers');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};


app.listen(port, ()=>{
	console.log("The server is running!");
});