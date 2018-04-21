// Preferences updates for Diet, Cuisine and Intolerances Components

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/User");

module.exports = app => {
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
};
