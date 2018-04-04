const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipesSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  servings: Number,
  preparationMinutes: Number,
  cookingMinutes: Number,
  extendedIngredients: [
    {
      id: Number,
      name: String,
      amount: Number,
      originalString: String
    }
  ],
  id: Number,
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
