// Routes related to Recipe Data

const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const Recipe = require("../models/Recipe");
const FullRecipeInfoResponse = require("../MiscRefFiles/FullRecipeInfoResponse");

module.exports = app => {
  // Search For Recipes By Cuisine
  app.get("/recipe/search/:queryCuisine/:direction?/:offset?", requireLogin, async (req, res) => {
    try {
      let { queryCuisine, direction } = req.params;
      let offset = parseInt(req.params.offset) || 0;
      let directionSign = Math.sign(direction === "Next" ? 1 : -1);
      let { intolerances, diet } = req.user.preferences;
      let results_recipeIds = [];
      let results_recipeInfo = FullRecipeInfoResponse;
   
      // // Convert Pref Objects into Spoonacular Query String segments
      // function makeString(obj) {
      //   let arr = [];
      //   for (let key in obj) {
      //     if (obj[key] === true && key !== "$init") {
      //       arr.push(key);
      //     }
      //   }
      //   // join with url-encoding for comma-space
      //   return arr.join("%2C+");
      // }

      // let queryIntolerances = makeString(intolerances);
      // let queryDiet = makeString(diet);
      // let numberOfResults = 3;

      // // Recursive Spoonacular API query
      // // User may save recipes while paginating results
      // // When saved recipes are filtered, will recursively call API query until
      // // "numberOfResults" of recipes have accumulated in "results_recipeIds" array
      // const querySpoon = async () => {
      //   console.log("querySpoon called");
      //   let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}&diet=${queryDiet}&instructionsRequired=true&intolerances=${queryIntolerances}&limitLicense=false&number=${numberOfResults}&offset=${offset}&query=*`;

      //   // Query list of recipes
      //   try {
      //     let results = await axios({
      //       method: "get",
      //       url: query,
      //       headers: {
      //         "X-Mashape-Key": keys.spoonacularKey,
      //         Accept: "application/json"
      //       }
      //     });

      //     // If NO Recipe Results are returned, throw error
      //     if (results.data.results.length === 0) throw "No recipes found";

      //     // Store first 10 unsaved recipe ids into results_recipeIds array
      //     for (let item of results.data.results) {
      //       // UNLESS Recipe Id is already stored in User Model's savedRecipe array
      //       if (req.user.savedRecipes.indexOf(item.id) === -1) {
      //         results_recipeIds.push(item.id);
      //       } else {
      //         console.log(`Recipe ${item.id} has already been saved by user`);
      //       }
      //     }

      //     // If after filtering saved recipes an additional query is necessary
      //     // will make another call adjusting the update based on whether user is
      //     // paginating forward or backward through results
      //     if (results_recipeIds.length < numberOfResults) {
      //       offset += directionSign * numberOfResults;
      //       return querySpoon(offset);
      //     }
      //   } catch (e) {
      //     console.log("catching error", e);
      //     if (e === "No recipes found") {
      //       console.log("error in try catch 3", e);
      //       res.statusMessage = "No recipes found";
      //       return e;
      //     }
      //   }
      // };

      // try {
      //   await querySpoon();
      // } catch (e) {
      //   console.log("error in try catch 2", e);
      //   return e;
      // }

      // // Query for recipe info by id in results_recipeIds array
      // // Store in results_recipeInf array
      // const start = Date.now();
      // let queryIds = results_recipeIds.join("%2C");

      // let query2 = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${queryIds}&includeNutrition=false`;

      // // console.log("query2: ", query2);
      // // Query list of recipes
      // let results2 = await axios({
      //   method: "get",
      //   url: query2,
      //   headers: {
      //     "X-Mashape-Key": keys.spoonacularKey,
      //     Accept: "application/json"
      //   }
      // });
      // results_recipeInfo = results2.data;

      // console.log("This query process took: ", Date.now() - start);

      // Return results_recipeInf array to client
      res.send(results_recipeInfo);
    } catch (e) {
      console.log("error in try catch 1", e);
      return e;
    }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // User Saves a Recipe to MongoDB
  app.post("/recipe/save/:recipeId", requireLogin, async (req, res) => {
    let { recipeId } = req.params;
    // Save RecipeId to User Model for reference on Recipe Search Route
    req.user.savedRecipes.push(recipeId);

    // let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?includeNutrition=false`;

    // let results = await axios({
    //   method: "get",
    //   url: query,
    //   headers: {
    //     "X-Mashape-Key": keys.spoonacularKey,
    //     Accept: "application/json"
    //   }
    // });

    // console.log("request body: ", req.body);

    // Save Recipe to MongoDB
    const existingRecipe = await Recipe.findOne({ id: recipeId });
    if (existingRecipe) {
      console.log("Recipe already exists in MongoDB");
      return res.send(existingRecipe);
    }

    // Create a new instance/document of the User Model

    const {
      servings,
      preparationMinutes,
      cookingMinutes,
      readyInMinutes,
      extendedIngredients,
      instructions,
      id,
      sourceName,
      sourceUrl,
      title,
      image,
      analyzedInstructions
    } = req.body;

    const recipe = await new Recipe({
      _user: req.user.id,
      servings,
      preparationMinutes,
      cookingMinutes,
      readyInMinutes,
      extendedIngredients,
      instructions,
      id,
      sourceName,
      sourceUrl,
      title,
      image,
      analyzedInstructions
    }).save();

    // Save User Model after having pushed recipeId to saveRecipes array
    const user = await req.user.save();
    res.send(recipe);
  });
};
