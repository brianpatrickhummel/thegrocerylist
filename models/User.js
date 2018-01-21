// Dependency
const mongoose = require("mongoose");

// Create the Schema class
const { Schema } = mongoose;

// Instantiate a userSchema object with the Schema class we just made
const UserSchema = new Schema({
  googleId: String,
  // username is a string. We will trim any trailing whitespace. It's also required
  username: {
    type: String,
    trim: true
  },
  // email is a string, and it must be a unique one in our collection
  // Notice how it must match our regex, which checks for email
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  // This will make a userCreated entry in our doc, by default the current time string.
  userCreated: {
    type: Date,
    default: Date.now
  },
  intolerances: {
    dairy: { type: Boolean, default: false },
    egg: { type: Boolean, default: false },
    gluten: { type: Boolean, default: false },
    peanut: { type: Boolean, default: false },
    seafood: { type: Boolean, default: false },
    sesame: { type: Boolean, default: false },
    shellfish: { type: Boolean, default: false },
    soy: { type: Boolean, default: false },
    sulfite: { type: Boolean, default: false },
    treenut: { type: Boolean, default: false },
    wheat: { type: Boolean, default: false }
  },
  diettype: {
    lactovegetarian: { type: Boolean, default: false },
    ovovegetarian: { type: Boolean, default: false },
    paleo: { type: Boolean, default: false },
    primal: { type: Boolean, default: false },
    pescetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false },
    ketogenic: { type: Boolean, default: false },
    whole30: { type: Boolean, default: false }
  },
  cuisines: {
    african: { type: Boolean, default: false },
    american: { type: Boolean, default: false },
    british: { type: Boolean, default: false },
    cajun: { type: Boolean, default: false },
    caribbean: { type: Boolean, default: false },
    chinese: { type: Boolean, default: false },
    easterneuropean: { type: Boolean, default: false },
    french: { type: Boolean, default: false },
    german: { type: Boolean, default: false },
    greek: { type: Boolean, default: false },
    indian: { type: Boolean, default: false },
    irish: { type: Boolean, default: false },
    italian: { type: Boolean, default: false },
    japanese: { type: Boolean, default: false },
    jewish: { type: Boolean, default: false },
    korean: { type: Boolean, default: false },
    latinamerican: { type: Boolean, default: false },
    mexican: { type: Boolean, default: false },
    middleeastern: { type: Boolean, default: false },
    nordic: { type: Boolean, default: false },
    southern: { type: Boolean, default: false },
    spanish: { type: Boolean, default: false },
    thai: { type: Boolean, default: false },
    vietnamese: { type: Boolean, default: false }
  }
});

// Create the "User" model with our UserSchema schema
const User = mongoose.model("users", UserSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = User;
