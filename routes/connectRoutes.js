//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PASSPORT AUTHORIZATION ROUTES  //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // = = = = = GOOGLE = = = = = = = = = = = = = = = = = = = = = = = = = =

  // Send to Google to do the authorization
  app.get("/connect/google", requireLogin, passport.authorize("google", { scope: ["profile", "email"] }));

  app.get(
    "/connect/google/callback",
    passport.authorize("google", {
      successRedirect: "/preferences/1",
      failureRedirect: "/"
    })
  );

  // = = = = = FACEBOOK = = = = = = = = = = = = = = = = = = = = = = = = = =

  // Send to Facebook to do the authorization
  app.get("/connect/facebook", requireLogin, passport.authorize("facebook", { scope: ["public_profile", "email"] }));

  app.get(
    "/connect/facebook/callback",
    passport.authorize("facebook", {
      successRedirect: "/preferences/1",
      failureRedirect: "/"
    })
  );

  // = = = = = TWITTER = = = = = = = = = = = = = = = = = = = = = = = = = =

  // Send to Twitter to do the authorization
  app.get("/connect/twitter", requireLogin, passport.authorize("twitter", { scope: ["include_email=true"] }));

  app.get(
    "/connect/twitter/callback",
    passport.authorize("twitter", {
      successRedirect: "/preferences/1",
      failureRedirect: "/"
    })
  );

  // = = = = = GITHUB = = = = = = = = = = = = = = = = = = = = = = = = = =

  // Send to Github to do the authorization
  app.get("/connect/github", requireLogin, passport.authorize("github", { scope: "email" }));

  app.get(
    "/connect/github/callback",
    passport.authorize("github", {
      successRedirect: "/preferences/1",
      failureRedirect: "/"
    })
  );
};
