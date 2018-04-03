const axios = require("axios");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
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

    let query = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=${queryCuisine}&diet=${queryDiet}&instructionsRequired=false&intolerances=${queryIntolerances}&limitLicense=false&number=10&offset=0&query=burger`;

    console.log(`query: ${query}`);

    let results = await axios({
      method: "get",
      url: query,
      headers: {
        "X-Mashape-Key": "o1NvBRr6qmmshZawYHoVx0fF2PTtp19Vq5sjsnklJyGTT9rXYo",
        "Content-Type": "text/html"
      }
    });
    res.json(results.data);
  });
};
