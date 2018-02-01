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
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },
    // Verify Callback when Google has returned the following account data items
    // done is a callback function
    async (req, accessToken, refreshToken, profile, done) => {
      // = = = = = = = User NOT logged in, process AUTHENTICATION = = = = = = = = =
      if (!req.user) {
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
          primaryEmail: profile.emails[0].value,
          authProviders: {
            google: {
              googleId: profile.id,
              googleDisplayName: profile.displayName,
              googleEmail: profile.emails[0].value
            }
          }
        }).save();
        // Call done, back to passport.authenticate which calls req.login/serializeUser();
        done(null, user);

        // = = = = = = = User IS logged in, process AUTHORIZATION to connect account = = = = = = = = =
      } else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        var user = req.user;

        // update the current user's Google credentials
        (user.authProviders.google.googleId = profile.id),
          (user.authProviders.google.googleDisplayName = profile.displayName),
          (user.authProviders.google.googleEmail = profile.emails[0].value);

        // save the user
        user.save(function(err) {
          if (err) throw err;
          return done(null, user);
        });
      }
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
      profileFields: ["id", "displayName", "name", "gender", "profileUrl", "email"],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      if (!req.user) {
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
          primaryEmail: profile.emails[0].value,
          authProviders: {
            facebook: {
              facebookId: profile.id,
              facebookDisplayName: profile.displayName,
              facebookEmail: profile.emails[0].value
            }
          }
        }).save();
        // Call done, back to passport.authenticate which calls req.login/serializeUser();
        done(null, user);
      } else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        var user = req.user;

        // update the current user's Facebook credentials
        (user.authProviders.facebook.facebookId = profile.id),
          (user.authProviders.facebook.facebookDisplayName = profile.displayName),
          (user.authProviders.facebook.facebookEmail = profile.emails[0].value);

        // save the user
        user.save(function(err) {
          if (err) throw err;
          return done(null, user);
        });
      }
    }
  )
);

// TWITTER = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback",
      passReqToCallback: true,
      includeEmail: true
    },
    async (req, token, tokenSecret, profile, done) => {
      if (!req.user) {
        console.log("Twitter profile: ", profile);
        const existingUser = await User.findOne({ "authProviders.twitter.twitterId": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        // Create a new instance/document of the User Model
        const user = await new User({
          primaryId: profile.id,
          primaryAccount: "twitter",
          primaryDisplayName: profile.displayName,
          primaryEmail: profile.emails[0].value,
          authProviders: {
            twitter: {
              twitterId: profile.id,
              twitterEmail: profile.emails[0].value,
              twitterDisplayName: profile.displayName
            }
          }
        }).save();
        // Call done, back to passport.authenticate which calls req.login/serializeUser();
        done(null, user);
      } else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        var user = req.user;

        // update the current user's Twitter credentials
        (user.authProviders.twitter.twitterId = profile.id),
          (user.authProviders.twitter.twitterDisplayName = profile.displayName),
          (user.authProviders.twitter.twitterEmail = profile.emails[0].value);

        // save the user
        user.save(function(err) {
          if (err) throw err;
          return done(null, user);
        });
      }
    }
  )
);

// GITHUB = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback",
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      if (!req.user) {
        console.log("Github profile: ", profile);
        const existingUser = await User.findOne({ "authProviders.github.githubId": profile.id });

        if (existingUser) {
          return cb(null, existingUser);
        }
        // Create a new instance/document of the User Model
        const user = await new User({
          primaryId: profile.id,
          primaryAccount: "github",
          primaryDisplayName: profile.displayName,
          primaryEmail: profile.emails[0].value,
          authProviders: {
            github: {
              githubId: profile.id,
              githubDisplayName: profile.displayName,
              githubEmail: profile.emails[0].value
            }
          }
        }).save();
        // Call done, back to passport.authenticate which calls req.login/serializeUser();
        cb(null, user);
      } else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        var user = req.user;

        // update the current user's Github credentials
        (user.authProviders.github.githubId = profile.id),
          (user.authProviders.github.githubDisplayName = profile.displayName),
          (user.authProviders.github.githubEmail = profile.emails[0].value);

        // save the user
        user.save(function(err) {
          if (err) throw err;
          return cb(null, user);
        });
      }
    }
  )
);
