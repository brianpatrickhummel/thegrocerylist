//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PASSPORT UNLINK ROUTES  //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const passport = require("passport"),
  requireLogin = require("../middlewares/requireLogin"),
  User = require("../models/User");

module.exports = app => {
  app.get("/unlink/:account", async (req, res) => {
    let accountType = req.params.account,
      query1 = "authProviders." + accountType + "." + accountType + "Id",
      query2 = "authProviders." + accountType + "." + accountType + "Email",
      query3 = "authProviders." + accountType + "." + accountType + "DisplayName";
    await User.update(
      { _id: req.user._id },
      {
        $unset: {
          [query1]: "",
          [query2]: "",
          [query3]: ""
        }
      }
    );
    res.redirect("/preferences");
  });
};
