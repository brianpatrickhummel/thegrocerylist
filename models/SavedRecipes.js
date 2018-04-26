// SavedRecipes Subdocument collection

const mongoose = require("mongoose");

const { Schema } = mongoose;

const SavedRecipesSchema = new Schema({
  cuisines: {
    african: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    american: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    british: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    cajun: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    caribbean: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    chinese: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    easterneuropean: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    french: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    german: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    greek: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    indian: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    irish: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    italian: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    japanese: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    jewish: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    korean: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    latinamerican: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    mexican: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    middleeastern: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    nordic: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    southern: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    spanish: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    thai: [
      {
        id: Number,
        title: String,
        image: String
      }
    ],
    vietnamese: [
      {
        id: Number,
        title: String,
        image: String
      }
    ]
  }
});

// Rather than creating a model and registering it with Mongoose
module.exports = SavedRecipesSchema;
