var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer');
var securePagesRouter = require('./routes/securePages');
var session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//(dust|ejs|hbs|hjs|jade|pug|twig|vash)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var sess = {
  secret: 'keyboard cat',
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true
}
app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/abc.txt', function(req, res, next){
	res.send("abc success NOT the file...");
});

//pages
app.use('/', indexRouter);
// authenticate
app.use('/users', usersRouter);
app.use( function(req, res, next){ 
  if(req.session.user){
    next();
  }else{
    res.send({result:"fail", code:"401", msg:"not authorized . pls login"});
  }
});
//secure
app.use('/', securePagesRouter);
//api is secure
app.use('/api/customer', customerRouter); //rest

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
