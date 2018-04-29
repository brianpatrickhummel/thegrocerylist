// Will mimic the creation of a new Mongo User model
// Generate user id for use in Session Factory
// Access to Mongo User Schema via setup.js

const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = () => {
  return new User({}).save();
};
