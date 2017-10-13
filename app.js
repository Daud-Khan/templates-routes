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
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');
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
	res.render('home');
});
app.get('/signup', (req, res)=>{
	res.render('signup');
})
app.post('/signup', (req, res)=>{
	req.body.name
	req.body.email
	req.body.username
	req.body.password
User.register(new User({name: req.body.name, email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
	if (err){
		console.log(err);
		return res.render('signup');
	}
	passport.authenticate("local")(req, res, function(){
		res.redirect('dashboard');
	})
	
})
});

app.get('/login', (req, res)=>{
	res.render('login.hbs');
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
app.get('/dashboard', isLoggedIn ,(req,res)=>{
	res.render('dashboard');
});
app.get('/user', isLoggedIn ,(req, res)=>{
	res.render('user');
});

app.get('/maps', isLoggedIn ,(req, res)=>{
	res.render('maps');
});
app.get('/notifications', isLoggedIn ,(req, res)=>{
	res.render('notifications');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};


app.listen(3000, ()=>{
	console.log("The server is running!");
});