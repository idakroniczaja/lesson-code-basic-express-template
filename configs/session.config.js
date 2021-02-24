const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const mongoose = require('mongoose')

module.exports = app => {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 86400000 //Age(in seconds) * 1000 ms
    },
    store: new MongoStore ({
      mongooseConnection: mongoose.connection,
      // ttl = time to live
      ttl: 24 * 60 * 60 // 1 day
    })
  })
 );
}