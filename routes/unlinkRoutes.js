//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PASSPORT UNLINK ROUTES  //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

const passport = require("passport"),
  requireLogin = require("../middlewares/requireLogin"),
  User = require("../models/User");

module.exports = app => {
  app.post("/unlink/:account", async (req, res) => {
    let accountType = req.params.account,
      query1 = "authProviders." + accountType + ".Id",
      query2 = "authProviders." + accountType + ".Email",
      query3 = "authProviders." + accountType + ".DisplayName";
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $unset: {
          [query1]: "",
          [query2]: "",
          [query3]: ""
        }
      },
      { new: true }
    );
    res.send(user);
  });
};
