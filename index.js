// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");
require("./services/passport");
// Require Mongoose Schemas
require("./models/User.js");
require("./models/Recipe.js");

// Create Instance of Express
const app = express();

//
// MIDDLEWARES
// Run Morgan for Logging
app.use(logger("dev"));
// Parse req object on http request and make body available on req.body property
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// Stores session data within cookie on client-side
// Also extracts data out of cookie and assigns it to req.session property
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// Express loads the session data, passport.initialize accesses req.session.passport.user
app.use(passport.initialize());
// Passport.session detects a serialized user, calls the deserializeUser() method which attaches user to req.user
app.use(passport.session());

//
// MONGOOSE
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// MongoDB Configuration configuration
var DB = keys.mongoURI || "mongodb://localhost/GroceryListDevLocal";
mongoose.connect(
  DB,
  { useMongoClient: true }
);
const db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ROUTES
require("./routes/authRoutes")(app);
require("./routes/connectRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/unlinkRoutes")(app);
require("./routes/recipeRoutes")(app);
require("./routes/prefRoutes")(app);

// Serving React assets via Express Server when in Production Environment
if (process.env.NODE_ENV === "production") {
  // For traffic that is un-routed, first look for files to serve here
  app.use(express.static("client/build"));
  // For all remaining un-routed requests, serve the React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
