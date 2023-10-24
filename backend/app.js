const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const {
  notFoundErrorHandler,
  defaultErrorHandler,
} = require('./middlewares/common/errorHandler');
const loginRoute = require('./router/loginRoute');
const usersRoute = require('./router/usersRoute');
const friendShipRoute = require('./router/friendShipRoute');
const conversationRoute = require('./router/conversationsRoute');
const messageRoute = require('./router/messageRoute');
const { initializeSocket } = require('./socket/socket');
const port = process.env.PORT || 5000;
// connect to database
connectDB();

// init app
const app = express();

// cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// response header
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
//
app.set('trust proxy', 1);

//
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

// home route
// @public
app.use('/', loginRoute);
app.use('/users', usersRoute);
app.use('/friends', friendShipRoute);
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute);
//static path
app.use('/static', express.static(__dirname + '/public'));

// register route
// @public

// error handler
// 404
app.use(notFoundErrorHandler);
// default
app.use(defaultErrorHandler);

const server = app.listen(port, () => {});

// socket
const io = initializeSocket(server);
global.io = io;
