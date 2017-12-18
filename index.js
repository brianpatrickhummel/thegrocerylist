// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var keys = require("./config/keys");
const passport = require("passport");

require("./services/passport");

// Require Mongoose Schemas
var User = require("./models/User.js");

// Create Instance of Express
var app = express();

// MIDDLEWARES
// Run Morgan for Logging
app.use(logger("dev"));

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Initialize Passport
app.use(passport.initialize());

// MONGOOSE
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// MongoDB Configuration configuration
mongoose.connect(keys.mongoURI, { useMongoClient: true });
var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ROUTES
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
