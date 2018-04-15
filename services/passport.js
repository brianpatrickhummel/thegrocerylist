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

// Cookie req.session.passport.user id is converted back into a mongoose user model instance (req.user)
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
        const existingUser = await User.findOne({ "authProviders.google.Id": profile.id });
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
              Id: profile.id,
              DisplayName: profile.displayName,
              Email: profile.emails[0].value,
              isPrimary: true
            }
          }
        }).save();
        // Call done, back to passport.authenticate which calls req.login/serializeUser();
        done(null, user);

        // = = = = = = = User IS logged in, process AUTHORIZATION to connect account = = = = = = = = =
      } else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        console.log("REQ.USER ALREADY LOGGED IN, WILL AUTHORIZE AND CONNECT THIS ACCOUNT");
        var user = req.user;
        // update the current user's Google credentials
        (user.authProviders.google.Id = profile.id),
          (user.authProviders.google.DisplayName = profile.displayName),
          (user.authProviders.google.Email = profile.emails[0].value),
          (user.authProviders.google.isPrimary = false);

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
        const existingUser = await User.findOne({ "authProviders.facebook.Id": profile.id });
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
              Id: profile.id,
              DisplayName: profile.displayName,
              Email: profile.emails[0].value,
              isPrimary: true
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
        (user.authProviders.facebook.Id = profile.id),
          (user.authProviders.facebook.DisplayName = profile.displayName),
          (user.authProviders.facebook.Email = profile.emails[0].value),
          (user.authProviders.facebook.isPrimary = false);

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
        // console.log("Twitter profile: ", profile);
        const existingUser = await User.findOne({ "authProviders.twitter.Id": profile.id });
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
              Id: profile.id,
              Email: profile.emails[0].value,
              DisplayName: profile.displayName,
              isPrimary: true
            }
          }
        }).save();
        // Call done, back to passport.authenticate which calls req.login/serializeUser();
        done(null, user);
      } else {
        // user already exists and is logged in, we have to link accounts
        // pull the user out of the session
        var user = req.user;
        console.log("twitter auth, user is : ", user);
        // update the current user's Twitter credentials
        (user.authProviders.twitter.Id = profile.id),
          (user.authProviders.twitter.DisplayName = profile.displayName),
          (user.authProviders.twitter.Email = profile.emails[0].value),
          (user.authProviders.twitter.isPrimary = false);

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
        // console.log("Github profile: ", profile);
        const existingUser = await User.findOne({ "authProviders.github.Id": profile.id });

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
              Id: profile.id,
              DisplayName: profile.displayName,
              Email: profile.emails[0].value,
              isPrimary: true
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
        (user.authProviders.github.Id = profile.id),
          (user.authProviders.github.DisplayName = profile.displayName),
          (user.authProviders.github.Email = profile.emails[0].value),
          (user.authProviders.github.isPrimary = false);

        // save the user
        user.save(function(err) {
          if (err) throw err;
          return cb(null, user);
        });
      }
    }
  )
);
