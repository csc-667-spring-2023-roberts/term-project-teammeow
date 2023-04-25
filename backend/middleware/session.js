const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("../db/connection");

module.exports = session({
  store: new pgSession({ pgPromise: db }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
});
