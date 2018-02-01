const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  FacebookStrategy = require("passport-facebook"),
  TwitterStrategy = require("passport-twitter").Strategy,
  GitHubStrategy = require("passport-github").Strategy,
  keys = require("../config/keys"),
  User = require("../models/User");

// MongoDB user passed from req.login(), user.id will be inserted into token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// cookie req.session.passport.user id is converted back into a mongoose user model instance (req.user)
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// GOOGLE = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
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
      // console.log(`Google profile: ${profile}`);
      // All database queries are asynchronous, results are returned via a promise
      const existingUser = await User.findOne({ "authProviders.google.googleId": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Create a new instance/document of the User Model
      const user = await new User({
        primaryId: profile.id,
        primaryAccount: "google",
        primaryDisplayName: profile.displayName,
        authProviders: {
          google: {
            googleId: profile.id,
            displayName: profile.displayName,
            lastName: profile.name.familyName,
            firstName: profile.name.givenName,
            googleEmail: profile.emails[0].value
          }
        }
      }).save();
      // Call done, back to passport.authenticate which calls req.login/serializeUser();
      done(null, user);
    }
  )
);

// FACEBOOK = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "name", "gender", "profileUrl", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("Facebook profile: ", profile);
      const existingUser = await User.findOne({ "authProviders.facebook.facebookId": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Create a new instance/document of the User Model
      const user = await new User({
        primaryId: profile.id,
        primaryAccount: "facebook",
        primaryDisplayName: profile.displayName,
        authProviders: {
          facebook: {
            facebookId: profile.id,
            displayName: profile.displayName,
            facebookEmail: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          }
        }
      }).save();
      // Call done, back to passport.authenticate which calls req.login/serializeUser();
      done(null, user);
    }
  )
);

// TWITTER = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback"
    },
    async (token, tokenSecret, profile, done) => {
      // console.log("Twitter profile: ", profile);
      const existingUser = await User.findOne({ "authProviders.twitter.twitterId": profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Create a new instance/document of the User Model
      const user = await new User({
        primaryId: profile.id,
        primaryAccount: "twitter",
        primaryDisplayName: profile.name,
        authProviders: {
          twitter: {
            twitterId: profile.id,
            displayName: profile.name
          }
        }
      }).save();
      // Call done, back to passport.authenticate which calls req.login/serializeUser();
      done(null, user);
    }
  )
);

// GITHUB = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      // console.log("Github profile: ", profile);
      const existingUser = await User.findOne({ "authProviders.github.githubId": profile.id });

      if (existingUser) {
        return cb(null, existingUser);
      }
      // Create a new instance/document of the User Model
      const user = await new User({
        primaryId: profile.id,
        primaryAccount: "github",
        primaryDisplayName: profile.displayName,
        authProviders: {
          github: {
            githubId: profile.id,
            displayName: profile.displayName,
            githubEmail: profile.emails[0].value
          }
        }
      }).save();
      // Call done, back to passport.authenticate which calls req.login/serializeUser();
      cb(null, user);
    }
  )
);
