// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./services/passport");
// Require Mongoose Schemas
require("./models/User.js");

// Create Instance of Express
const app = express();

// MIDDLEWARES
// Run Morgan for Logging
app.use(logger("dev"));
// Parse req object on http request and make body available on req.body property
app.use(bodyParser.json());
// stores session data within cookie on client-side
// also extracts data out of cookie and assigns it to req.session property
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// express loads the session data, passport.initialize accesses req.session.passport.user
app.use(passport.initialize());
// passport.session detects a serialized user, calls the deserializeUser() method
// which attaches user to req.user
app.use(passport.session());

// MONGOOSE
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// MongoDB Configuration configuration
mongoose.connect(keys.mongoURI, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ROUTES
require("./routes/authRoutes")(app);
require("./routes/prefRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
