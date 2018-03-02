const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Prefs = mongoose.model("prefs");

module.exports = app => {
  // GET CURRENT USERS PREFERENCES
  app.get("/api/prefs", requireLogin, async (req, res) => {
    const prefs = await Prefs.find({ _user: req.user.id });
    // .select({ recipients: false })
    // .sort({ dateSent: "desc" });
    res.send(prefs);
  });

  app.post("/api/prefs", async (req, res) => {
    const { intolerances, dietTypes, cuisines, id } = req.body;

    const existingPrefs = await Prefs.findOne({ _user: id });
    if (existingPrefs) {
      console.log("user has existing preferences");
      res.send(existingPrefs);
    } else {
      const prefs = await new Prefs({
        intolerances,
        dietTypes,
        cuisines,
        _user: id
      }).save();
      res.send(prefs);
    }
  });
};
