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
    lowercase: true
  },
  primaryEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  authProviders: {
    google: {
      DisplayName: {
        type: String,
        trim: true,
        lowercase: true
      },
      Email: {
        type: String,
        trim: true,
        lowercase: true
      },
      Id: String,
      isPrimary: {
        type: String,
        default: "NO"
      }
    },
    facebook: {
      DisplayName: {
        type: String,
        trim: true,
        lowercase: true
      },
      Email: {
        type: String,
        trim: true,
        lowercase: true
      },
      Id: String,
      isPrimary: {
        type: String,
        default: "NO"
      }
    },
    twitter: {
      DisplayName: {
        type: String,
        trim: true,
        lowercase: true
      },
      Email: {
        type: String,
        trim: true,
        lowercase: true
      },
      Id: String,
      isPrimary: {
        type: String,
        default: "NO"
      }
    },
    github: {
      DisplayName: {
        type: String,
        trim: true,
        lowercase: true
      },
      Email: {
        type: String,
        trim: true,
        lowercase: true
      },
      Id: String,
      isPrimary: {
        type: String,
        default: "NO"
      }
    }
  },
  altEmail: {
    type: String,
    trim: true,
    lowercase: true
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
