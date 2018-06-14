"use strict";
var express = require('express'),
	  app = express(),
	  bodyParser = require("body-parser"),
		userController = require('./controller/userController'),
		mongoose = require('mongoose'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		passport = require('passport'),
		flash = require('connect-flash'),
		cloudinary = require('cloudinary'),
		validator = require('express-validator'),
		mongoMemory = require('connect-mongo')(session),
		Admin = require('./Routes/Admin'),
    path = require('path'),
		compression = require('compression'),
		csrf = require('csurf'),
	  server = require("http").Server(app),
		io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		return res.status(200).json({});
	}
	return next();
});

app.use(validator());
app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
	expires : new Date(Date.now() + 10800000),
	cookie: { maxAge:  new Date(Date.now() + 10800000) }, //# 3 tiếng
	store: new mongoMemory({ mongooseConnection: mongoose.connection })
}));
app.use(csrf());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use("*", (req, res, next) => {
	res.locals.user = req.user || null || undefined;
	res.locals.session = req.session;
	res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
	return next();
});

app.use((req, res, next) => {
  req.url = req.url.replace(/\/([^\/]+)\.[0-9a-f]+\.(css|js|jpg|png|gif|svg)$/, '/$1.$2');
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1 year' }));
app.set("view engine", "ejs");
app.set("views", "./Views");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://superMarketVLU:asdasd@ds157833.mlab.com:57833/testchotot')
.then(() => console.log("Start Database Success"))
.catch((err, done) => done("Lỗi kết nối DB: " + err + ''));
require('./config/passport');
app.use("/admin", Admin);
userController(app);
userController.respond(io);

let port = process.env.PORT || 8080;
server.listen(port,() => console.log('Server start: ' + port));

module.exports = app;
