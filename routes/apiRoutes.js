//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////        API ROUTES                   //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// ** add routes for unlinking social media accounts
// google ---------------------------------
// app.get('/api/unlink/google', function(req, res) {
//   var user          = req.user;
//   user.google.token = undefined;
//   user.save(function(err) {
//     res.redirect('/profile');
//   });
// });

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
  app.get("/api/setPrimary/:account", async (req, res) => {
    let accountType = req.params.account,
      o_id = new ObjectID(req.user._id),
      query = { [`authProviders.${accountType}.isPrimary`]: "true" };
    // enclosing the query in brackets tells Mongo that it's a path rather than literal

    console.log("MongoDB query: ", query);
    console.log("o_id: ", o_id);
    let result = await User.findOneAndUpdate(
      {
        _id: o_id
      },
      { $set: query }
    );
    console.log("Found User: ", result);
    res.redirect("/preferences");
  });
};
