const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const Recipe = require("../models/Recipe");

module.exports = app => {
  // Search For Recipes By Cuisine
  app.get("/recipe/search/:queryCuisine", requireLogin, async (req, res) => {
    let { queryCuisine } = req.params;
    let { intolerances, diet } = req.user.preferences;
    let results_recipeIds = [];
    let results_recipeInfo = [
      {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: true,
        veryHealthy: false,
        cheap: false,
        veryPopular: true,
        sustainable: false,
        weightWatcherSmartPoints: 12,
        gaps: "no",
        lowFodmap: false,
        ketogenic: false,
        whole30: false,
        servings: 4,
        preparationMinutes: 10,
        cookingMinutes: 50,
        sourceUrl: "http://damndelicious.net/2012/07/08/threaded-spaghetti-hot-dog-bites-with-homemade-marinara/",
        spoonacularSourceUrl:
          "https://spoonacular.com/threaded-spaghetti-hot-dog-bites-with-homemade-marinara-sauce-535914",
        aggregateLikes: 5579,
        spoonacularScore: 97,
        healthScore: 34,
        creditText: "Damn Delicious",
        sourceName: "Damn Delicious",
        pricePerServing: 229.79,
        extendedIngredients: [
          {
            id: 2069,
            aisle: "Oil, Vinegar, Salad Dressing",
            image: "https://spoonacular.com/cdn/ingredients_100x100/balsamic-vinegar.jpg",
            consistency: "liquid",
            name: "balsamic vinegar",
            amount: 2,
            unit: "teaspoons",
            originalString: "2 teaspoons balsamic vinegar",
            metaInformation: []
          },
          {
            id: 2044,
            aisle: "Produce;Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/basil.jpg",
            consistency: "solid",
            name: "basil leaves",
            amount: 0.25,
            unit: "cup",
            originalString: "1/4 cup torn fresh basil leaves",
            metaInformation: []
          },
          {
            id: 10011693,
            aisle: "Canned and Jarred",
            image: "https://spoonacular.com/cdn/ingredients_100x100/tomatoes-canned.jpg",
            consistency: "solid",
            name: "canned tomatoes",
            amount: 56,
            unit: "ounce",
            originalString: "2 (28-ounce) cans crushed tomatoes",
            metaInformation: []
          },
          {
            id: 93668,
            aisle: "Meat",
            image: "https://spoonacular.com/cdn/ingredients_100x100/chicken-or-turkey-sausage.jpg",
            consistency: "solid",
            name: "chicken sausage",
            amount: 12.8,
            unit: "ounce",
            originalString: "1 (12.8-ounce) package andouille chicken sausage, sliced",
            metaInformation: []
          },
          {
            id: 11215,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg",
            consistency: "solid",
            name: "garlic",
            amount: 8,
            unit: "cloves",
            originalString: "8 cloves garlic, thinly sliced",
            metaInformation: []
          },
          {
            id: 4053,
            aisle: "Oil, Vinegar, Salad Dressing",
            image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
            consistency: "liquid",
            name: "olive oil",
            amount: 1,
            unit: "tablespoon",
            originalString: "1 tablespoon olive oil",
            metaInformation: []
          },
          {
            id: 2047,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
            consistency: "solid",
            name: "salt",
            amount: 1,
            unit: "teaspoon",
            originalString: "1 teaspoon salt",
            metaInformation: []
          },
          {
            id: 11420420,
            aisle: "Pasta and Rice",
            image: "https://spoonacular.com/cdn/ingredients_100x100/spaghetti.jpg",
            consistency: "solid",
            name: "spaghetti",
            amount: 8,
            unit: "ounces",
            originalString: "8 ounces spaghetti, broken in half",
            metaInformation: []
          }
        ],
        id: 535914,
        title: "Threaded Spaghetti Hot Dog Bites with Homemade Marinara Sauce",
        readyInMinutes: 60,
        image: "https://spoonacular.com/recipeImages/535914-556x370.jpg",
        imageType: "jpg",
        cuisines: ["american"],
        dishTypes: ["lunch", "main course", "main dish", "dinner"],
        diets: ["dairy free"],
        occasions: [],
        winePairing: {
          pairedWines: ["riesling", "gewurztraminer", "rose wine"],
          pairingText:
            "Hot Dogs can be paired with Riesling, Gewurztraminer, and rosé Wine. A Gewürztraminer will be great with your basic New York style hot dog with mustard and sauerkraut. For a Chicago-style dog with sour pickles and hot peppers, you might opt for a crisp Riesling. No matter your toppings, a dry rosé almost always works. One wine you could try is Chateau Ste. Michelle Dry Riesling. It has 4.5 out of 5 stars and a bottle costs about 10 dollars.",
          productMatches: [[Object]]
        },
        instructions:
          "Heat olive oil in a large pot over low heat. Add the garlic and cook until golden, about 3 minutes. Stir in the basil and tomatoes. Bring to a boil and add the salt; reduce heat to low and simmer, stirring occasionally, until sauce has thickened, about 40-45 minutes. Stir in the balsamic vinegar. Thread 5-7 spaghetti strands through each slice of sausage. In a large pot of boiling salted water, cook pasta according to package instructions; drain well. Serve immediately with marinara sauce.",
        analyzedInstructions: [
          {
            name: "",
            steps: [
              {
                number: 1,
                step: "Heat olive oil in a large pot over low heat.",
                ingredients: [
                  {
                    id: 4053,
                    name: "olive oil",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg"
                  }
                ],
                equipment: [
                  {
                    id: 404752,
                    name: "pot",
                    image: "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg"
                  }
                ]
              },
              {
                number: 2,
                step:
                  "Add the garlic and cook until golden, about 3 minutes. Stir in the basil and tomatoes. Bring to a boil and add the salt; reduce heat to low and simmer, stirring occasionally, until sauce has thickened, about 40-45 minutes. Stir in the balsamic vinegar. Thread 5-7 spaghetti strands through each slice of sausage. In a large pot of boiling salted water, cook pasta according to package instructions; drain well.",
                ingredients: [
                  {
                    id: 2069,
                    name: "balsamic vinegar",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/balsamic-vinegar.jpg"
                  },
                  {
                    id: 11420420,
                    name: "spaghetti",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/spaghetti.jpg"
                  },
                  {
                    id: 11215,
                    name: "garlic",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg"
                  },
                  {
                    id: 2044,
                    name: "basil",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/basil.jpg"
                  },
                  {
                    id: 20420,
                    name: "pasta",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
                  },
                  {
                    id: 2047,
                    name: "salt",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg"
                  }
                ],
                equipment: [
                  {
                    id: 404752,
                    name: "pot",
                    image: "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg"
                  }
                ],
                length: {
                  number: 48,
                  unit: "minutes"
                }
              },
              {
                number: 3,
                step: "Serve immediately with marinara sauce.",
                ingredients: [],
                equipment: []
              }
            ]
          }
        ],
        creditsText: "Damn Delicious"
      },
      {
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        veryHealthy: false,
        cheap: false,
        veryPopular: true,
        sustainable: false,
        weightWatcherSmartPoints: 5,
        gaps: "no",
        lowFodmap: false,
        ketogenic: false,
        whole30: false,
        servings: 4,
        preparationMinutes: 15,
        cookingMinutes: 5,
        sourceUrl: "http://www.skinnymom.com/shrimp-caesar-salad/",
        spoonacularSourceUrl: "https://spoonacular.com/shrimp-caesar-salad-718787",
        aggregateLikes: 1583,
        spoonacularScore: 97,
        healthScore: 41,
        creditText: "Skinny Mom",
        sourceName: "Skinny Mom",
        pricePerServing: 489.89,
        extendedIngredients: [
          {
            id: 1002030,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/pepper.jpg",
            consistency: "solid",
            name: "black pepper",
            amount: 4,
            unit: "servings",
            originalString: "black pepper, to taste",
            metaInformation: []
          },
          {
            id: 10311529,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.jpg",
            consistency: "solid",
            name: "cherry tomatoes",
            amount: 1,
            unit: "cup",
            originalString: "1 cup cherry tomatoes, halved",
            metaInformation: []
          },
          {
            id: 18242,
            aisle: "Oil, Vinegar, Salad Dressing",
            image: "https://spoonacular.com/cdn/ingredients_100x100/croutons.jpg",
            consistency: "solid",
            name: "croutons",
            amount: 0.5,
            unit: "cup",
            originalString: "½ cup fat-free seasoned croutons",
            metaInformation: []
          },
          {
            id: 1034053,
            aisle: "Oil, Vinegar, Salad Dressing",
            image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
            consistency: "liquid",
            name: "extra virgin olive oil",
            amount: 1,
            unit: "teaspoon",
            originalString: "1 teaspoon extra virgin olive oil",
            metaInformation: []
          },
          {
            id: 11215,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg",
            consistency: "solid",
            name: "garlic",
            amount: 1,
            unit: "teaspoon",
            originalString: "1 teaspoon minced garlic",
            metaInformation: []
          },
          {
            id: 9152,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg",
            consistency: "liquid",
            name: "lemon juice",
            amount: 2,
            unit: "tablespoons",
            originalString: "2 tablespoons lemon juice",
            metaInformation: []
          },
          {
            id: 4641,
            aisle: "Condiments",
            image: "https://spoonacular.com/cdn/ingredients_100x100/mayonnaise.png",
            consistency: "liquid",
            name: "light mayonnaise",
            amount: 2,
            unit: "tablespoons",
            originalString: "2 tablespoons light mayonnaise",
            metaInformation: []
          },
          {
            id: 1033,
            aisle: "Cheese",
            image: "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg",
            consistency: "solid",
            name: "parmesan cheese",
            amount: 0.25,
            unit: "cup",
            originalString: "¼ cup shredded Parmesan cheese",
            metaInformation: []
          },
          {
            id: 1033,
            aisle: "Cheese",
            image: "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg",
            consistency: "solid",
            name: "parmesan cheese",
            amount: 1,
            unit: "teaspoon",
            originalString: "1 teaspoon shredded Parmesan cheese",
            metaInformation: []
          },
          {
            id: 1033,
            aisle: "Cheese",
            image: "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg",
            consistency: "solid",
            name: "parmesan cheese",
            amount: 2,
            unit: "tablespoons",
            originalString: "2 tablespoons Parmesan cheese",
            metaInformation: []
          },
          {
            id: 12147,
            aisle: "Produce;Baking",
            image: "https://spoonacular.com/cdn/ingredients_100x100/pine-nuts.jpg",
            consistency: "solid",
            name: "pine nuts",
            amount: 3,
            unit: "tablespoons",
            originalString: "3 tablespoons pine nuts",
            metaInformation: []
          },
          {
            id: 10011251,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/romaine.jpg",
            consistency: "solid",
            name: "romaine hearts",
            amount: 12,
            unit: "cups",
            originalString: "12 cups Romaine hearts, cut into 1-inch pieces (3 hearts)",
            metaInformation: []
          },
          {
            id: 2047,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
            consistency: "solid",
            name: "salt",
            amount: 4,
            unit: "servings",
            originalString: "salt, to taste",
            metaInformation: []
          },
          {
            id: 15152,
            aisle: "Seafood",
            image: "https://spoonacular.com/cdn/ingredients_100x100/shrimp.jpg",
            consistency: "liquid",
            name: "shrimp",
            amount: 1,
            unit: "pound",
            originalString: "1 pound medium shrimp, shelled and deveined (30-32 shrimp)",
            metaInformation: []
          },
          {
            id: 14412,
            aisle: "Beverages",
            image: "https://spoonacular.com/cdn/ingredients_100x100/water.jpg",
            consistency: "liquid",
            name: "water",
            amount: 2,
            unit: "tablespoons",
            originalString: "2 tablespoons water",
            metaInformation: []
          },
          {
            id: 6971,
            aisle: "Condiments",
            image: "https://spoonacular.com/cdn/ingredients_100x100/dark-sauce.jpg",
            consistency: "liquid",
            name: "worcestershire sauce",
            amount: 0.5,
            unit: "teaspoon",
            originalString: "½ teaspoon Worcestershire sauce",
            metaInformation: []
          }
        ],
        id: 718787,
        title: "Shrimp Caesar Salad",
        readyInMinutes: 20,
        image: "https://spoonacular.com/recipeImages/718787-556x370.jpg",
        imageType: "jpg",
        cuisines: ["american"],
        dishTypes: ["side dish", "lunch", "main course", "salad", "main dish", "dinner"],
        diets: ["gluten free", "pescatarian"],
        occasions: [],
        winePairing: {
          pairedWines: ["pinot grigio", "riesling", "sauvignon blanc"],
          pairingText:
            "Shrimp works really well with Pinot Grigio, Riesling, and Sauvignon Blanc. These crisp white wines work well with shrimp prepared in a variety of ways, whether grilled, fried, or in garlic sauce. The Chateau Ste. Michelle Pinot Gris with a 4 out of 5 star rating seems like a good match. It costs about 13 dollars per bottle.",
          productMatches: [[Object]]
        },
        instructions:
          "To make the dressing, combine all of the dressing ingredients together in a food processor or blender, and pulse until smooth. Chill the dressing while making the salad.To cook the shrimp, heat a large skillet over medium-high heat. Season the shrimp with salt and black pepper, to taste.Add the oil and the shrimp, cooking for about 30 seconds. Flip all the shrimp and cook an additional 30 seconds on the other side, until pink and set aside until ready to use. To assemble the salad, toss the lettuce, 2 tablespoons of the cheese, the tomatoes, pine nuts, cooked shrimp, and dressing all together.Sprinkle the top with the croutons and  cup Parmesan cheese.",
        analyzedInstructions: [
          {
            name: "",
            steps: [
              {
                number: 1,
                step:
                  "To make the dressing, combine all of the dressing ingredients together in a food processor or blender, and pulse until smooth. Chill the dressing while making the salad.To cook the shrimp, heat a large skillet over medium-high heat. Season the shrimp with salt and black pepper, to taste.",
                ingredients: [
                  {
                    id: 1102047,
                    name: "salt and pepper",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/salt-and-pepper.jpg"
                  },
                  {
                    id: 15152,
                    name: "shrimp",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/shrimp.jpg"
                  }
                ],
                equipment: [
                  {
                    id: 404771,
                    name: "food processor",
                    image: "https://spoonacular.com/cdn/equipment_100x100/food-processor.png"
                  },
                  {
                    id: 404726,
                    name: "blender",
                    image: "https://spoonacular.com/cdn/equipment_100x100/blender.png"
                  },
                  {
                    id: 404645,
                    name: "frying pan",
                    image: "https://spoonacular.com/cdn/equipment_100x100/pan.png"
                  }
                ]
              },
              {
                number: 2,
                step:
                  "Add the oil and the shrimp, cooking for about 30 seconds. Flip all the shrimp and cook an additional 30 seconds on the other side, until pink and set aside until ready to use. To assemble the salad, toss the lettuce, 2 tablespoons of the cheese, the tomatoes, pine nuts, cooked shrimp, and dressing all together.Sprinkle the top with the croutons and  cup Parmesan cheese.",
                ingredients: [
                  {
                    id: 1033,
                    name: "parmesan",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg"
                  },
                  {
                    id: 12147,
                    name: "pine nuts",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/pine-nuts.jpg"
                  },
                  {
                    id: 18242,
                    name: "croutons",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/croutons.jpg"
                  },
                  {
                    id: 15152,
                    name: "shrimp",
                    image: "https://spoonacular.com/cdn/ingredients_100x100/shrimp.jpg"
                  }
                ],
                equipment: []
              }
            ]
          }
        ],
        creditsText: "Skinny Mom"
      }
    ];

    // Convert Pref Objects into Spoonacular Query String segments
    //   function makeString(obj) {
    //     let arr = [];
    //     for (let key in obj) {
    //       if (obj[key] === true && key !== "$init") {
    //         arr.push(key);
    //       }
    //     }
    //      // join with url-encoding for comma-space
    //     return arr.join("%2C+");
    //   }

    //   let queryIntolerances = makeString(intolerances);
    //   let queryDiet = makeString(diet);

    //   let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}&diet=${queryDiet}&instructionsRequired=true&intolerances=${queryIntolerances}&limitLicense=false&number=10&offset=0&query=*`;

    //    // Query list of recipes
    //   let results = await axios({
    //     method: "get",
    //     url: query,
    //     headers: {
    //       "X-Mashape-Key": keys.spoonacularKey,
    //       Accept: "application/json"
    //     }
    //   });
    //   if (!results.data.results.length) return res.send([{ id: 0, title: "No Recipes Found" }]);

    //   // Store each recipe id in results_recipeIds array
    //   for (let item of results.data.results) {
    //     // UNLESS Recipe Id is already stored in User Model's savedRecipe array
    //     if (req.user.savedRecipes.indexOf(item.id) === -1) {
    //       results_recipeIds.push(item.id);
    //     } else {
    //       console.log(`Recipe ${item.id} has already been saved by user`);
    //     }
    //   }

    //    // Query for recipe info by id in results_recipeIds array
    //    // Store in results_recipeInf array
    //   const start = Date.now();
    //   let queryIds = results_recipeIds.join("%2C");
    //   let query2 = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${queryIds}&includeNutrition=false`;
    //   // console.log("query2: ", query2);
    //  // Query list of recipes
    //   let results2 = await axios({
    //     method: "get",
    //     url: query2,
    //     headers: {
    //       "X-Mashape-Key": keys.spoonacularKey,
    //       Accept: "application/json"
    //     }
    //   });
    //   results_recipeInfo = results2.data;

    //   console.log("This query process took: ", Date.now() - start);

    // Return results_recipeInf array to client
    res.send(results_recipeInfo);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // *********************** ADD REQUIRELOGIN *************************
  // X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X
  // User Saves a Recipe to MongoDB
  app.post("/recipe/save/:recipeId", async (req, res) => {
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

    // Save Recipe to MongoDB
    const existingRecipe = await Recipe.findOne({ id: recipeId });
    if (existingRecipe) {
      console.log("Recipe already exists in MongoDB");
      return res.send(req.user);
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

    // Save updated User Model
    const user = await req.user.save();
    res.send(user);
  });
};
