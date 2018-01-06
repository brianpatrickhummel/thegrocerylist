const passport = require("passport");

module.exports = app => {
  // PASSPORT AUTH
  // Passport redirects request to Google for OAuth authorization
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
    console.log(req.user);
    console.log("session: ", req.session);
    res.redirect("/create");
  });

  // GET CURRENT USER
  app.get("/api/current_user", (req, res) => {
    // returns the MongoDB user id that cookie-session extracted from cookie
    res.send(req.user);
  });

  // LOGOUT CURRENT USER
  // Passport also attaches a logout() method to the request object
  // method removes the req.user property and clears the login session
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
