const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var keys = require("../config/keys");
const User = require("../models/User");

// register the Google Strategy with Passport and create a new instance of this strategy
// redirects browser to google for user to grant permission to our app
// google will redirect to callbackURL and include user code
// express server will retrieve user profile from Google and execute the callback below
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    // Verify Callback when Google has returned the following account data items
    // done is a callback function
    async (accessToken, refreshToken, profile, done) => {
      // console.log('profile: ', profile);
      // All database queries are asynchronous, results are returned via a promise
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Create a new instance/document of the User Model
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
