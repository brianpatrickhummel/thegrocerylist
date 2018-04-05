const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const Recipe = require("../models/Recipe");

module.exports = app => {
  // Search For Recipes By Cuisine
  app.get("/recipe/search/:queryCuisine", requireLogin, async (req, res) => {
    // let { queryCuisine } = req.params;
    // let { intolerances, diet } = req.user.preferences;

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

    // let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}&diet=${queryDiet}&instructionsRequired=true&intolerances=${queryIntolerances}&limitLicense=false&number=10&offset=0&query=*`;

    // console.log(`query: ${query}`);

    // let results = await axios({
    //   method: "get",
    //   url: query,
    //   headers: {
    //     "X-Mashape-Key": keys.spoonacularKey,
    //     Accept: "application/json"
    //   }
    // });

    ////////////////////////////////////////////////////////////////////////
    ////// logic for removing saved recipes from search results
    ////////////////////////////////////////////////////////////////////////
    let results = {
      data: {
        results: [
          {
            id: 262682,
            title: "Thai Sweet Potato Veggie Burgers with Spicy Peanut Sauce",
            readyInMinutes: 75,
            image: "thai-sweet-potato-veggie-burgers-with-spicy-peanut-sauce-262682.jpg",
            imageUrls: ["thai-sweet-potato-veggie-burgers-with-spicy-peanut-sauce-262682.jpg"]
          },
          {
            id: 227961,
            title: "Cajun Spiced Black Bean and Sweet Potato Burgers",
            readyInMinutes: 20,
            image: "Cajun-Spiced-Black-Bean-and-Sweet-Potato-Burgers-227961.jpg",
            imageUrls: ["Cajun-Spiced-Black-Bean-and-Sweet-Potato-Burgers-227961.jpg"]
          },
          {
            id: 602708,
            title: "Meatless Monday: Grilled Portobello Mushroom Burgers with Romesco and Arugula",
            readyInMinutes: 15,
            image: "Meatless-Monday--Grilled-Portobello-Mushroom-Burgers-with-Romesco-and-Arugula-602708.jpg",
            imageUrls: ["Meatless-Monday--Grilled-Portobello-Mushroom-Burgers-with-Romesco-and-Arugula-602708.jpg"]
          },
          {
            id: 759739,
            title: "Gluten-Free Veggie Burger",
            readyInMinutes: 45,
            image: "gluten-free-veggie-burger-759739.jpg",
            imageUrls: ["gluten-free-veggie-burger-759739.jpg"]
          },
          {
            id: 630255,
            title: "Protein Powerhouse Veggie Burgers",
            readyInMinutes: 95,
            image: "Protein-Powerhouse-Veggie-Burgers-630255.jpg",
            imageUrls: ["Protein-Powerhouse-Veggie-Burgers-630255.jpg"]
          },
          {
            id: 479732,
            title: "Meatless Monday: Curried Veggie Burgers with Zucchini, Lentils, and Quinoa",
            readyInMinutes: 15,
            image: "Meatless-Monday--Curried-Veggie-Burgers-with-Zucchini--Lentils--and-Quinoa-479732.jpg",
            imageUrls: ["Meatless-Monday--Curried-Veggie-Burgers-with-Zucchini--Lentils--and-Quinoa-479732.jpg"]
          },
          {
            id: 541691,
            title: "Black Bean Mole Burgers",
            readyInMinutes: 45,
            image: "black-bean-mole-burgers-541691.jpg",
            imageUrls: ["black-bean-mole-burgers-541691.jpg"]
          },
          {
            id: 34035,
            title: "Sprouted Lentil Veggie Burger",
            readyInMinutes: 30,
            image: "sprouted_lentil_veggie_burger-34035.jpg",
            imageUrls: ["sprouted_lentil_veggie_burger-34035.jpg", "sprouted-lentil-veggie-burger-2-34035.jpg"]
          },
          {
            id: 766301,
            title: "Queso Cheese Burgers",
            readyInMinutes: 60,
            image: "queso-cheese-burgers-766301.jpg",
            imageUrls: ["queso-cheese-burgers-766301.jpg"]
          },
          {
            id: 761774,
            title: "Simple Soybean Burgers",
            readyInMinutes: 45,
            image: "simple-soybean-burgers-761774.jpg",
            imageUrls: ["simple-soybean-burgers-761774.jpg"]
          }
        ],
        baseUri: "https://spoonacular.com/recipeImages/",
        offset: 0,
        number: 10,
        totalResults: 10,
        processingTimeMs: 323,
        expires: 1473587241426,
        isStale: false
      }
    };

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
