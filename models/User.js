// Dependency
const mongoose = require("mongoose");

// Create the Schema class
const { Schema } = mongoose;

// Instantiate a userSchema object with the Schema class we just made
const UserSchema = new Schema({
  primaryId: String,
  primaryAccount: String,
  primaryDisplayName: String,
  authProviders: {
    google: {
      googleId: String,
      displayName: {
        type: String,
        trim: true
      },
      lastName: {
        type: String,
        trim: true
      },
      firstName: {
        type: String,
        trim: true
      },
      googleEmail: {
        type: String,
        lowercase: true,
        trim: true
      }
    },
    facebook: {
      facebookId: String,
      displayName: {
        type: String,
        trim: true
      },
      facebookEmail: {
        type: String,
        trim: true
      },
      lastName: {
        type: String,
        trim: true
      },
      firstName: {
        type: String,
        trim: true
      }
    },
    twitter: {
      twitterId: String,
      displayName: {
        type: String,
        trim: true
      }
    },
    github: {
      githubId: String,
      displayName: String,
      email: String
    }
  },
  altEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

// Create the "User" model with our UserSchema schema
const User = mongoose.model("User", UserSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = User;
