//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////        API ROUTES                   //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const passport = require("passport"),
  User = require("../models/User"),
  ObjectID = require("mongodb").ObjectID;

module.exports = app => {
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
    // console.log("after LOGOUT req.user: ", req.user);
    // console.log("after LOGOUT session: ", req.session);
    res.redirect("/");
  });

  // Set social media account as primary
  app.post("/api/setPrimary/:account", async (req, res) => {
    let accountType = req.params.account,
      currentPrimary = req.user.primaryAccount,
      Id = req.user.authProviders[accountType].Id,
      DisplayName = req.user.authProviders[accountType].DisplayName,
      Email = req.user.authProviders[accountType].Email,
      o_id = new ObjectID(req.user._id),
      query = {
        // unset current primary account
        [`authProviders.${currentPrimary}.isPrimary`]: "false",
        // set new primary account
        primaryAccount: `${accountType}`,
        primaryId: Id,
        primaryDisplayName: DisplayName,
        primaryEmail: Email,
        [`authProviders.${accountType}.isPrimary`]: "true"
      };

    let user = await User.findOneAndUpdate(
      {
        _id: o_id
      },
      {
        $set: query
      },
      { new: true }
    );

    res.send(user);
  });
};
