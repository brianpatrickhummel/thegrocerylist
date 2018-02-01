const passport = require("passport");

module.exports = app => {
  // PASSPORT AUTH

  // = = = = = GOOGLE = = = = = = = = = = = = = = = =
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // Specific Google account scopes for which we can request access for a user's account info
      scope: ["profile", "email"]
    })
  );

  // PASSPORT CALLBACK
  // Passport returns authentication object and user code from Google, executes the callback in GoogleStrategy
  // Attempts to exchange the code for a user profile and accessToken
  // Once authenticated and serialized to session, redirects
  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    console.log("after Google auth, req.user: ", req.user);
    console.log("after Google auth, session: ", req.session);
    res.redirect("/dashboard");
  });

  // = = = = = Facebook = = = = = = = = = = = = = = =
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    console.log("after Facebook auth, req.user: ", req.user);
    console.log("after Facebook auth, session: ", req.session);
    res.redirect("/dashboard");
  });

  // = = = = = = Twitter = = = = = = = = = = = = = = =

  // send to twitter to do the authentication
  app.get("/auth/twitter", passport.authenticate("twitter", { scope: "email" }));

  // handle the callback after twitter has authorized the user
  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log("after Twitter auth, req.user: ", req.user);
      console.log("after Twitter auth, session: ", req.session);
      res.redirect("/dashboard");
    }
  );

  // = = = = = = Github = = = = = = = = = = = = = = =

  // send to twitter to do the authentication
  app.get("/auth/github", passport.authenticate("github", { scope: "email" }));

  // handle the callback after twitter has authorized the user
  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log("after Github auth, req.user: ", req.user);
      console.log("after Github auth, session: ", req.session);
      res.redirect("/dashboard");
    }
  );

  // = = = = = = = = API = = = = = = = = = = = = = = =

  // GET CURRENT USER
  app.get("/api/current_user", (req, res) => {
    // returns the MongoDB user id that cookie-session extracted from cookie
    // console.log("user id: ", req.user.id);
    res.send(req.user);
  });

  // LOGOUT CURRENT USER
  // Passport also attaches a logout() method to the request object
  // method removes the req.user property and clears the login session
  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log("after LOGOUT req.user: ", req.user);
    console.log("after LOGOUT session: ", req.session);
    res.redirect("/");
  });
};
