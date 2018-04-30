const mongoose = require("mongoose");
const { Schema } = mongoose;
const SavedRecipesSchema = require("./SavedRecipes");

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
  },
  savedRecipesCount: {
    type: Number,
    default: 0
  },
  savedRecipes: {
    type: SavedRecipesSchema,
    default: SavedRecipesSchema
  },
  preferences: {
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
    diet: {
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
  }
});

// Create the "User" model with our UserSchema schema
const User = mongoose.model("User", UserSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = User;
