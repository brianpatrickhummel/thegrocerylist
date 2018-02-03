// Dependency
const mongoose = require("mongoose");

// Create the Schema class
const { Schema } = mongoose;

// Instantiate a userSchema object with the Schema class we just made
const UserSchema = new Schema({
  primaryId: String,
  primaryAccount: {
    type: String,
    trim: true
  },
  primaryDisplayName: {
    type: String,
    trim: true,
    uppercase: true
  },
  primaryEmail: {
    type: String,
    trim: true,
    uppercase: true
  },
  authProviders: {
    google: {
      googleId: String,
      googleDisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      googleEmail: {
        type: String,
        trim: true,
        uppercase: true
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
        trim: true,
        uppercase: true
      },
      facebookEmail: {
        type: String,
        trim: true,
        uppercase: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    twitter: {
      twitterId: String,
      twitterEmail: {
        type: String,
        trim: true,
        uppercase: true
      },
      twitterDisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    github: {
      githubId: String,
      githubDisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      githubEmail: {
        type: String,
        trim: true,
        uppercase: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }
  },
  altEmail: {
    type: String,
    trim: true,
    uppercase: true
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
