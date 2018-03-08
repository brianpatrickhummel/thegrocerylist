const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Prefs = mongoose.model("prefs");
const User = require("../models/User");

module.exports = app => {
  // endpoint handles preferences updates for Diet, Cuisine and Intolerances Components
  app.post("/api/updatePrefs/:prefType", requireLogin, async (req, res) => {
    let query = `preferences.${req.params.prefType}`;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          [query]: req.body
        }
      },
      { new: true }
    );
    res.send(user);
  });

  // GET CURRENT USERS PREFERENCES
  // app.get("/api/prefs", requireLogin, async (req, res) => {
  //   const prefs = await Prefs.find({ _user: req.user.id });
  //   .select({ recipients: false })
  //   .sort({ dateSent: "desc" });
  //   res.send(prefs);
  // });

  // app.post("/api/prefs", async (req, res) => {
  //   const { intolerances, diet, cuisines, id } = req.body;

  //   const existingPrefs = await Prefs.findOne({ _user: id });
  //   if (existingPrefs) {
  //     console.log("user has existing preferences");
  //     res.send(existingPrefs);
  //   } else {
  //     const prefs = await new Prefs({
  //       intolerances,
  //       diet,
  //       cuisines,
  //       _user: id
  //     }).save();
  //     res.send(prefs);
  //   }
  // });
};
