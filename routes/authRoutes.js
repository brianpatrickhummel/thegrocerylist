const passport = require("passport");

module.exports = app => {
  // Passport redirects request to Google for OAuth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // Specific Google account scopes for which we can request access for a user's account info
      scope: ["profile", "email"]
    })
  );

  // Passport returns authentication object and user code from Google, executes the callback in GoogleStrategy
  // Attempts to exchange the code for a user profile and accessToken
  // Once authenticated, redirects to surveys page
  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.send({ brian: "Brian" });
  });
};
