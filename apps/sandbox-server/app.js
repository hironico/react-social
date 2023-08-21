const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const logoutRouter = require('./routes/logout');
const loginRouter = require('./routes/login');

const app = express();

// helmet helps ensure security by setting http headers properly
// const helmet = require('helmet')
// app.use(helmet());

// dont show we are a nodejs server with express
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// configure session management using cookies
const maxAge = 24 * 60 * 60 * 1000; // 24 hours
app.use(session({
    secret: 'john the revelator',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    maxAge: maxAge
  }));

app.use(express.static(path.join(__dirname, '..', 'sandbox', 'build')));

app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);

// custom 404
app.use((req, res, next) => {
    res.status(404).send("<html><body><pre>Lost on the Internet? You are here -> .</pre></body></html>");
})

// custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Well done. You broke the server!');
})

module.exports = app; 
