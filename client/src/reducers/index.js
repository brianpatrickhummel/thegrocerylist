// reducers index.js

import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer
  // prefs: prefsReducer,
  // saved: savedRecipesReducer,
  // favorites: favoritesReducer,
  // lists: listsReducer
});
