require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require('passport');
var session  = require('express-session');
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;
var cors = require('cors')


// Middleware                          CHeck this (true)?
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors())
 


//Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
var authRoute = require('./routes/auth.js')(app,passport);
//load passport strategies
require('./config/passport/passport.js')(passport, db.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// // // Starting the server, syncing our models ------------------------------------/
 db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
});



