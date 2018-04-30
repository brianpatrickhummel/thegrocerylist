const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipesSchema = new Schema({
  servings: Number,
  preparationMinutes: Number,
  cookingMinutes: Number,
  readyInMinutes: Number,
  extendedIngredients: [
    {
      id: Number,
      name: String,
      amount: Number,
      originalString: String,
      aisle: String,
      unit: String
    }
  ],
  instructions: String,
  id: Number,
  sourceName: String,
  sourceUrl: String,
  title: String,
  image: String,
  analyzedInstructions: [
    {
      steps: [
        {
          number: Number,
          step: String
        }
      ]
    }
  ]
});

const Recipe = mongoose.model("Recipes", RecipesSchema);
module.exports = Recipe;
