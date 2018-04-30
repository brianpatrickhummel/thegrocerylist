// reducers index.js

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import saveRecipeReducer from "./saveRecipeReducer";
import retrieveRecipeReducer from "./retrieveRecipeReducer";
import deleteRecipeReducer from "./deleteRecipeReducer";

export default combineReducers({
  auth: authReducer,
  savedRecipe: saveRecipeReducer,
  retrievedRecipe: retrieveRecipeReducer,
  deletedRecipe: deleteRecipeReducer
  // favorites: favoritesReducer,
  // lists: listsReducer
});
