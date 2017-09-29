var express = require ("express");
var hbs = require("hbs");

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/views'));
app.get('/',(req, res)=>{
	res.redirect('/login');
});
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
})