// reducers index.js

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import saveRecipeReducer from "./saveRecipeReducer";

export default combineReducers({
  auth: authReducer,
  savedRecipe: saveRecipeReducer
  // favorites: favoritesReducer,
  // lists: listsReducer
});
