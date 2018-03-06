const mongoose = require("mongoose");
// Create the Schema class
const { Schema } = mongoose;

const PreferencesSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  intolerances: {
    dairy: { type: Boolean, default: false },
    egg: { type: Boolean, default: false },
    gluten: { type: Boolean, default: false },
    peanut: { type: Boolean, default: false },
    seafood: { type: Boolean, default: false },
    sesame: { type: Boolean, default: false },
    shellfish: { type: Boolean, default: false },
    soy: { type: Boolean, default: false },
    sulfite: { type: Boolean, default: false },
    treenut: { type: Boolean, default: false },
    wheat: { type: Boolean, default: false }
  },
  diet: {
    lactovegetarian: { type: Boolean, default: false },
    ovovegetarian: { type: Boolean, default: false },
    paleo: { type: Boolean, default: false },
    primal: { type: Boolean, default: false },
    pescetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false },
    ketogenic: { type: Boolean, default: false },
    whole30: { type: Boolean, default: false }
  },
  cuisines: {
    african: { type: Boolean, default: false },
    american: { type: Boolean, default: false },
    british: { type: Boolean, default: false },
    cajun: { type: Boolean, default: false },
    caribbean: { type: Boolean, default: false },
    chinese: { type: Boolean, default: false },
    easterneuropean: { type: Boolean, default: false },
    french: { type: Boolean, default: false },
    german: { type: Boolean, default: false },
    greek: { type: Boolean, default: false },
    indian: { type: Boolean, default: false },
    irish: { type: Boolean, default: false },
    italian: { type: Boolean, default: false },
    japanese: { type: Boolean, default: false },
    jewish: { type: Boolean, default: false },
    korean: { type: Boolean, default: false },
    latinamerican: { type: Boolean, default: false },
    mexican: { type: Boolean, default: false },
    middleeastern: { type: Boolean, default: false },
    nordic: { type: Boolean, default: false },
    southern: { type: Boolean, default: false },
    spanish: { type: Boolean, default: false },
    thai: { type: Boolean, default: false },
    vietnamese: { type: Boolean, default: false }
  }
});

const Prefs = mongoose.model("prefs", PreferencesSchema);
module.export = Prefs;
