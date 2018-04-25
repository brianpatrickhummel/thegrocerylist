// SavedRecipes Subdocument collection

const mongoose = require("mongoose");

const { Schema } = mongoose;

const SavedRecipesSchema = new Schema({
  cuisines: {
    african: [Number],
    american: [Number],
    british: [Number],
    cajun: [Number],
    caribbean: [Number],
    chinese: [Number],
    easterneuropean: [Number],
    french: [Number],
    german: [Number],
    greek: [Number],
    indian: [Number],
    irish: [Number],
    italian: [Number],
    japanese: [Number],
    jewish: [Number],
    korean: [Number],
    latinamerican: [Number],
    mexican: [Number],
    middleeastern: [Number],
    nordic: [Number],
    southern: [Number],
    spanish: [Number],
    thai: [Number],
    vietnamese: [Number]
  }
});

// Rather than creating a model and registering it with Mongoose
module.exports = SavedRecipesSchema;
