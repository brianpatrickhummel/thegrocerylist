// Routes related to Recipe Data

const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const Recipe = require("../models/Recipe");
const FullRecipeInfoResponse = require("../MiscRefFiles/FullRecipeInfoResponse");
const ObjectID = require("mongodb").ObjectID;

module.exports = app => {
  // Search For Recipes By Cuisine
  app.get("/recipe/search/:queryCuisine/:direction?/:offset?", requireLogin, async(req, res, next) => {
    try {
      let {queryCuisine, direction} = req.params;
      let offset = parseInt(req.params.offset) || 0;
      let directionSign = Math.sign(direction === "Next"
        ? 1
        : -1);
      let {intolerances, diet} = req.user.preferences;
      let results_recipeIds = [];
      let results_recipeInfo = [];

      // Convert Pref Objects into Spoonacular Query String segments
      function makeString(obj) {
        let arr = [];
        for (let key in obj) {
          if (obj[key] === true && key !== "$init") {
            arr.push(key);
          }
        }
<<<<<<< HEAD
        // join with url-encoding for comma-space if no diet or intolerances prefs,
        // return empty string
        return arr.length > 0
          ? arr.join("%2C+")
          : "";
=======
        // join with url-encoding for comma-space
        // if no diet or intolerances prefs, return empty string
        return arr.length > 0 ? arr.join("%2C+") : "";
>>>>>>> refs/remotes/origin/master
      }

      let numberOfResults = 3;
      let dietString = makeString(diet);
      let intolString = makeString(intolerances);
      // If Diet/Intolerances Prefs provided, add to Query string
<<<<<<< HEAD
      let dietQuery = dietString.length === 0
        ? ""
        : `&diet=${dietString}`;
      let intolQuery = intolString.length === 0
        ? ""
        : `&intolerances=${intolString}`;

      // Recursive Spoonacular API query User may save recipes while paginating
      // results When saved recipes are filtered, will recursively call API query
      // until "numberOfResults" of recipes have accumulated in "results_recipeIds"
      // array
      const querySpoon = async() => {
=======
      let dietQuery = dietString.length === 0 ? "" : `&diet=${dietString}`;
      let intolQuery = intolString.length === 0 ? "" : `&intolerances=${intolString}`;

      // Recursive Spoonacular API query
      // User may save recipes while paginating results
      // When saved recipes are filtered, will recursively call API query until
      // "numberOfResults" of recipes have accumulated in "results_recipeIds" array
      const querySpoon = async () => {
>>>>>>> refs/remotes/origin/master
        let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}${dietQuery}&instructionsRequired=true${intolQuery}&limitLicense=false&number=${numberOfResults}&offset=${offset}&query=*`;

        // Query list of recipes

        try {
          let results = await axios({
            method: "get",
            url: query,
            headers: {
              "X-Mashape-Key": keys.spoonacularKey,
              Accept: "application/json"
            }
          });

          // Print Spoonacular API Daily REQ/RES Stats
          console.log("x-ratelimit-requests-limit: ", results.headers["x-ratelimit-requests-limit"]);
          console.log("x-ratelimit-requests-remaining: ", results.headers["x-ratelimit-requests-remaining"]);
          console.log("x-ratelimit-results-limit: ", results.headers["x-ratelimit-results-limit"]);
          console.log("x-ratelimit-results-remaining: ", results.headers["x-ratelimit-results-remaining"]);
          console.log("x-ratelimit-tinyrequests-limit: ", results.headers["x-ratelimit-tinyrequests-limit"]);
          console.log("x-ratelimit-tinyrequests-remaining: ", results.headers["x-ratelimit-tinyrequests-remaining"]);

          // If NO Recipe Results are returned, throw error
<<<<<<< HEAD
          if (results.data.results.length === 0) 
            throw "No recipes found";
          
=======
          if (results.data.results.length === 0) throw "No recipes found";

>>>>>>> refs/remotes/origin/master
          // Iterate through RecipeID Search Results
          for (let item of results.data.results) {
            // Until numberOfResults recipeIds are collected
            if (results_recipeIds.length < numberOfResults) {
              // If a RecipeId is not already saved by user
              if (req.user.savedRecipes.cuisines[queryCuisine].every(obj => obj.id !== item.id)) {
                // Collect unsaved RecipeId
                results_recipeIds.push(item.id);
                console.log("id added to results_recipeIds: ", item.id);
              } else {
                // Skip saved RecipeId
<<<<<<< HEAD
                console.log(`Recipe ${item.id} has already been saved by user`) // We have collected enough RecipeIds, exit iteration early;
              }
            } else 
              break;
            }
          
          // If after filtering saved recipes an additional query is necessary will make
          // another call adjusting the update based on whether user is paginating forward
          // or backward through results
=======
                console.log(`Recipe ${item.id} has already been saved by user`);
              }
            }
            // We have collected enough RecipeIds, exit iteration early
            else break;
          }

          // If after filtering saved recipes an additional query is necessary
          // will make another call adjusting the update based on whether user is
          // paginating forward or backward through results
>>>>>>> refs/remotes/origin/master
          if (results_recipeIds.length < numberOfResults) {
            offset += directionSign * numberOfResults;
            return querySpoon(offset);
          }
        } catch (e) {
          console.log("axios error: ", e);
        }
      };

      // Spoonacular API Recipe ID Search - Collect RecipeIds
      try {
        await querySpoon();
      } catch (e) {
        if (e === "No recipes found") {
          console.log("error in querySpoon try catch", e);
          res.statusMessage = "No recipes found";
<<<<<<< HEAD
          return res
            .status(404)
            .end();
=======
          return res.status(404).end();
>>>>>>> refs/remotes/origin/master
        }
        console.log("error from querySpoon try catch ", e);
      }

      // Benchmarking Spoonacular's Single vs Bulk Recipe Info Endpoints
      const start = Date.now();

      // Spoonacular API Bulk Recipe Info Search
      let queryIds = results_recipeIds.join("%2C");

<<<<<<< HEAD
      if (!queryIds.length > 0) 
        throw "empty recipeIds";
      
=======
      if (!queryIds.length > 0) throw "empty recipeIds";

>>>>>>> refs/remotes/origin/master
      let query2 = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${queryIds}&includeNutrition=false`;

      // Query list of recipes
      let results2 = await axios({
        method: "get",
        url: query2,
        headers: {
          "X-Mashape-Key": keys.spoonacularKey,
          Accept: "application/json"
        }
      });

      results_recipeInfo = results2.data;

<<<<<<< HEAD
      // console.log("This query process took: ", Date.now() - start); Return
      // results_recipeInf array to client
=======
      // console.log("This query process took: ", Date.now() - start);

      // Return results_recipeInf array to client
>>>>>>> refs/remotes/origin/master
      if (!results_recipeInfo.length) {
        throw "No recipes found";
      }
      res.send(results_recipeInfo);
    } catch (e) {
      console.log("error in main recipe search trycatch", e);
      if (e === "No recipes found") {
        res.statusMessage = e;
        return res
          .status(404)
          .end();
      } else {
        return next(e);
      }
    }
  });

  // User Saves a Recipe to MongoDB
<<<<<<< HEAD
  app.post("/recipe/save/:cuisine/:recipeId", requireLogin, async(req, res) => {
    let {cuisine, recipeId} = req.params;
=======
  app.post("/recipe/save/:cuisine/:recipeId", requireLogin, async (req, res) => {
    let { cuisine, recipeId } = req.params;
>>>>>>> refs/remotes/origin/master
    let userId = req.user._id;
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

    // console.log(`req.user.savedRecipes.cuisines[${cuisine}]`); Save RecipeId to
    // User Model for reference on Recipe Search Route
    req
      .user
      .savedRecipes
      .cuisines[cuisine]
      .push({id: id, title: title, image: image});
    req.user.savedRecipesCount++;

    // Save User Model after having pushed recipeId to saveRecipes array
    const user = await req
      .user
      .save();

    // Save Recipe to MongoDB
    let recipe = await Recipe.findOne({id: recipeId});
    if (recipe) {
      console.log("Recipe already exists in MongoDB: ", recipe.title);
<<<<<<< HEAD
      recipe = await Recipe.update({
        id: recipeId
      }, {
        $push: {
          _user: userId
        }
      });
      return res.send({recipe, user});
=======
      recipe = await Recipe.update(
        {
          id: recipeId
        },
        {
          $push: {
            _user: userId
          }
        }
      );
      return res.send({ recipe, user });
>>>>>>> refs/remotes/origin/master
    }

    // Create a new instance/document of the User Model
    recipe = await new Recipe({
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

<<<<<<< HEAD
    recipe = await Recipe.findOneAndUpdate({
      id: recipeId
    }, {
      $push: {
        _user: userId
      }
    }, {new: true});
=======
    recipe = await Recipe.findOneAndUpdate(
      {
        id: recipeId
      },
      {
        $push: {
          _user: userId
        }
      },
      { new: true }
    );
>>>>>>> refs/remotes/origin/master

    // Return recipe and user model to save recipe action creator
    res.send({recipe, user});
  });

  // Get Saved Recipe Info
  app.get("/recipe/retrieve/:recipeId", requireLogin, async(req, res) => {
    let {recipeId} = req.params;
    console.log("retrieve route recipe id: ", recipeId);

    try {
      let results = await Recipe.find({id: recipeId});

      if (results.length) {
        res.send(results);
<<<<<<< HEAD
      } else 
        throw "No recipes found";
      }
    catch (e) {
=======
      } else throw "No recipes found";
    } catch (e) {
>>>>>>> refs/remotes/origin/master
      console.log("retrieve route sending error", e);
      res.send(e);
    }
  });

  // Delete a recipe
<<<<<<< HEAD
  app.post("/recipe/delete/:recipeId/:cuisine", requireLogin, async(req, res) => {
    let {recipeId, cuisine} = req.params;
    let {cuisines} = req.user.savedRecipes;
=======
  app.post("/recipe/delete/:recipeId/:cuisine", requireLogin, async (req, res) => {
    let { recipeId, cuisine } = req.params;
    let { cuisines } = req.user.savedRecipes;
>>>>>>> refs/remotes/origin/master
    let o_id = new ObjectID(req.user._id);
    console.log("delete route, o_id: ", o_id);
    console.log("delete route, recipeId: ", recipeId);

    try {
      var index = cuisines[cuisine]
        .map(item => {
        return item.id;
      })
        .indexOf(parseInt(recipeId));
      console.log("index for recipe deletion is: ", index);
      cuisines[cuisine].splice(index, 1);
      console.log("just spliced object from savedRecipes array");

      req.user.savedRecipesCount--;
      console.log("decremented savedRecipesCount");
<<<<<<< HEAD
      const user = await req
        .user
        .save();

      let recipe = await Recipe.findOneAndUpdate({
        id: recipeId
      }, {
        $pull: {
          _user: {
            $in: [o_id]
          }
        }
      }, {new: true});

      console.log(`Recipe ${recipeId} should no longer contain user id: ${o_id}`);

      // If no users are saving this recipe, delete recipe document from Recipe
      // collection
      if (recipe._user.length < 1) {
        recipe = await Recipe.findOneAndRemove({id: recipeId});
        console.log(`${recipe.title} was removed from database`);
      }

      res.send({recipe, user})

    } catch (e) {
      console.log("sending error main try/catch e: ", e);
=======
      const user = await req.user.save();

      let recipe = await Recipe.findOneAndUpdate(
        {
          id: recipeId
        },
        {
          $pull: { _user: { $in: [o_id] } }
        },
        { new: true }
      );

      console.log(`Recipe ${recipeId} should no longer contain user id: ${o_id}`);

      res.send({ recipe, user });
    } catch (e) {
      console.log("sending error main try/catch");
>>>>>>> refs/remotes/origin/master
      return res.send(e);
    }
  });
};
