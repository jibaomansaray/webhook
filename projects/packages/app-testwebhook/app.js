var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
const { Server } = require("socket.io");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const webhookRouter = express.Router();

var app = express();

const server = http.createServer(app);
const io = new Server(server);
const clients = {};

// socket io stuff
io.on('connection', (socket) => {

  // delete the socket from the client object
  socket.on('disconnecting', () => {
    delete clients[socket.id];
  });

  // add the new socket to the client object
  clients[socket.id] = socket;
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

webhookRouter.post('/', (req, resp) => {
  resp.status(201);
  resp.json({
    success: true
  });

  Object.values(clients).forEach((socket) => { 
    socket.emit('new_payload', req.body);
  });
});

app.use('/webhook', webhookRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = server;


