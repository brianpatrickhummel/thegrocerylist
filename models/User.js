// Dependency
const mongoose = require("mongoose");

// Create the Schema class
const { Schema } = mongoose;

// Instantiate a userSchema object with the Schema class we just made
const UserSchema = new Schema({
  primaryId: String,
  primaryAccount: String,
  primaryDisplayName: String,
  primaryEmail: String,
  authProviders: {
    google: {
      googleId: String,
      googleDisplayName: {
        type: String,
        trim: true
      },
      googleEmail: {
        type: String,
        lowercase: true,
        trim: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    facebook: {
      facebookId: String,
      facebookDisplayName: {
        type: String,
        trim: true
      },
      facebookEmail: {
        type: String,
        trim: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    twitter: {
      twitterId: String,
      twitterEmail: String,
      twitterDisplayName: {
        type: String,
        trim: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    github: {
      githubId: String,
      githubDisplayName: String,
      githubEmail: String,
      isPrimary: {
        type: Boolean,
        default: false
      }
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
