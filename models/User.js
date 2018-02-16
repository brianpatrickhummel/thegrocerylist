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
      DisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      Email: {
        type: String,
        trim: true,
        uppercase: true
      },
      Id: String,
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    facebook: {
      DisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      Email: {
        type: String,
        trim: true,
        uppercase: true
      },
      Id: String,
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    twitter: {
      DisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      Email: {
        type: String,
        trim: true,
        uppercase: true
      },
      Id: String,
      isPrimary: {
        type: Boolean,
        default: false
      }
    },
    github: {
      DisplayName: {
        type: String,
        trim: true,
        uppercase: true
      },
      Email: {
        type: String,
        trim: true,
        uppercase: true
      },
      Id: String,
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
