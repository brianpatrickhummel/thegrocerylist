const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const Recipe = require("../models/Recipe");

module.exports = app => {
  // Search For Recipes By Cuisine
  app.get("/recipe/search/:queryCuisine", requireLogin, async (req, res) => {
    let { queryCuisine } = req.params;
    let { intolerances, diet } = req.user.preferences;

    // Convert Pref Objects into Spoonacular Query String segments
    function makeString(obj) {
      let arr = [];
      for (let key in obj) {
        if (obj[key] === true && key !== "$init") {
          arr.push(key);
        }
      }
      // join with url-encoding for comma-space
      return arr.join("%2C+");
    }

    let queryIntolerances = makeString(intolerances);
    let queryDiet = makeString(diet);

    let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}&diet=${queryDiet}&instructionsRequired=true&intolerances=${queryIntolerances}&limitLicense=false&number=10&offset=0&query=*`;

    console.log(`query: ${query}`);

    let results = await axios({
      method: "get",
      url: query,
      headers: {
        "X-Mashape-Key": keys.spoonacularKey,
        Accept: "application/json"
      }
    });

    ////////////////////////////////////////////////////////////////////////
    ////// logic for removing saved recipes from search results
    ////////////////////////////////////////////////////////////////////////

    // Send Data back to Client to display, paginate
    res.send(results.data);
  });

  // User Saves a Recipe to MongoDB
  app.get("/recipe/save/:recipeId", requireLogin, async (req, res) => {
    let { recipeId } = req.params;

    let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?includeNutrition=false`;

    let results = await axios({
      method: "get",
      url: query,
      headers: {
        "X-Mashape-Key": keys.spoonacularKey,
        Accept: "application/json"
      }
    });

    // Save Recipe to MongoDB
    const existingRecipe = await Recipe.findOne({ id: results.data.id });
    if (existingRecipe) {
      console.log("Recipe already exists in MongoDB");
      return res.json(existingRecipe);
    }

    // Create a new instance/document of the User Model

    const {
      servings,
      preparationMinutes,
      cookingMinutes,
      extendedIngredients,
      id,
      sourceUrl,
      title,
      image,
      analyzedInstructions
    } = results.data;
    console.log(results.data);
    const recipe = await new Recipe({
      _user: req.user.id,
      servings,
      preparationMinutes,
      cookingMinutes,
      extendedIngredients,
      id,
      sourceUrl,
      title,
      image,
      analyzedInstructions
    }).save();

    res.json(recipe);
  });
};
