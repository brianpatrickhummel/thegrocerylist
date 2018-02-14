//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PASSPORT UNLINK ROUTES  //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const passport = require("passport"),
  requireLogin = require("../middlewares/requireLogin"),
  User = require("../models/User");

module.exports = app => {
  app.get("/unlink/:account", async (req, res) => {
    let accountType = req.params.account,
      query1 = "authProviders." + accountType;
    await User.update(
      { _id: req.user._id },
      {
        $unset: {
          [query1]: ""
        }
      }
    );
    res.redirect("/preferences");
  });
};
