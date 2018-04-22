// PASSPORT AUTHENTICATION ROUTES

const passport = require("passport");

module.exports = app => {
  // = = = = = GOOGLE = = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // PASSPORT CALLBACK
  // Passport returns authentication object and user code from Google
  // Executes the callback in GoogleStrategy
  // Attempts to exchange the code for a user profile and accessToken
  // Once authenticated and serialized to session, redirects
  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    // console.log("after Google auth, req.user: ", req.user);
    // console.log("after Google auth, session: ", req.session);
    res.redirect("/preferences/0");
  });

  // = = = = = Facebook = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );
  // Handle callback after Facebook has authorized user
  app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    // console.log("after Facebook auth, req.user: ", req.user);
    // console.log("after Facebook auth, session: ", req.session);
    res.redirect("/preferences/0");
  });

  // = = = = = = Twitter = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get("/auth/twitter", passport.authenticate("twitter", { scope: ["include_email=true"] }));

  // Handle the callback after Twitter has authorized the user
  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: "/"
    }),
    (req, res) => {
      // console.log("after Twitter auth, req.user: ", req.user);
      // console.log("after Twitter auth, session: ", req.session);
      res.redirect("/preferences/0");
    }
  );

  // = = = = = = Github = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get("/auth/github", passport.authenticate("github", { scope: "email" }));

  // Handle the callback after Github has authorized the user
  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/"
    }),
    (req, res) => {
      // console.log("after Github auth, req.user: ", req.user);
      // console.log("after Github auth, session: ", req.session);
      res.redirect("/preferences/0");
    }
  );
};
