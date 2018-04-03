const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");

module.exports = app => {
  // ===============  SEARCH FOR RECIPE BY CUISINE ==================
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

    let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}&diet=${queryDiet}&instructionsRequired=true&intolerances=${queryIntolerances}&limitLicense=false&number=10&offset=0&query=burger`;

    console.log(`query: ${query}`);

    let results = await axios({
      method: "get",
      url: query,
      headers: {
        "X-Mashape-Key": keys.spoonacularKey
      }
    });

    // Send Data back to Client to display, paginate
    res.json(results.data);
  });

  // ===============  USER SAVES / RETRIEVE RECIPES DETAILS  ==================
  app.get("/recipe/save/:recipeId", requireLogin, async (req, res) => {
    let { recipeId } = req.params;

    let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?includeNutrition=false`;

    let results = await axios({
      method: "get",
      url: query,
      headers: {
        "X-Mashape-Key": keys.spoonacularKey
      }
    });

    // Save Recipe to MongoDB

    res.json(results.data);
  });
};
