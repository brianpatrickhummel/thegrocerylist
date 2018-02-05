//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PASSPORT UNLINK ROUTES  //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const passport = require("passport"),
  requireLogin = require("../middlewares/requireLogin"),
  User = require("../models/User");

module.exports = app => {
  // FACEBOOK = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get("/unlink/facebook", async (req, res) => {
    await User.update(
      { _id: req.user._id },
      {
        $unset: {
          "authProviders.facebook.facebookId": "",
          "authProviders.facebook.facebookDisplayName": "",
          "authProviders.facebook.facebookEmail": ""
        }
      }
    );
    res.redirect("/preferences");
  });

  // TWITTER = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get("/unlink/twitter", async (req, res) => {
    await User.update(
      { _id: req.user._id },
      {
        $unset: {
          "authProviders.twitter.twitterId": "",
          "authProviders.twitter.twitterDisplayName": "",
          "authProviders.twitter.twitterEmail": ""
        }
      }
    );
    res.redirect("/preferences");
  });

  // GOOGLE = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get("/unlink/google", async (req, res) => {
    await User.update(
      { _id: req.user._id },
      {
        $unset: {
          "authProviders.google.googleId": "",
          "authProviders.google.googleDisplayName": "",
          "authProviders.google.googleEmail": ""
        }
      }
    );
    res.redirect("/preferences");
  });

  // GITHUB = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  app.get("/unlink/github", async (req, res) => {
    await User.update(
      { _id: req.user._id },
      {
        $unset: {
          "authProviders.github.githubId": "",
          "authProviders.github.githubDisplayName": "",
          "authProviders.github.githubEmail": ""
        }
      }
    );
    res.redirect("/preferences");
  });
};
