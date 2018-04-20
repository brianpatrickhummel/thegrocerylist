import axios from "axios";
import { FETCH_USER, SAVE_RECIPE, SAVE_RECIPE_SUCCESS, SAVE_RECIPE_ERROR, SAVE_RECIPE_RESET } from "./types";

// Gather User Model from MongoDB
// redux-thunk allows us to return a function (with access to dispatch()) from action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // Pass updated User Model to Redux Store
  dispatch({ type: FETCH_USER, payload: res.data }); // user profile info is stored in .data
};

// Change primary social media account
export const setPrimary = setPrimaryAccountType => async dispatch => {
  const res = await axios.post(`/api/setPrimary/${setPrimaryAccountType}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Connect social media account
export const connectAccount = connectAccountType => async dispatch => {
  const res = await axios.get(`/connect/${connectAccountType}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Unlink social media account
export const unlinkAccount = unlinkAccountType => async dispatch => {
  const res = await axios.post(`/unlink/${unlinkAccountType}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Update Prefs for Diet, Cuisine and Intolerances (dictated by "prefType" parameter)
export const updatePrefs = (checkedList, prefType) => async dispatch => {
  const res = await axios.post(`/api/updatePrefs/${prefType}`, checkedList);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Save Single Recipe
export const saveRecipe = (recipeId, dataElement) => async dispatch => {
  // Begin Save, Display Loading Indicator
  dispatch({
    type: SAVE_RECIPE,
    payload: null
  });

  try {
    const res = await axios.post(`/recipe/save/${recipeId}`, dataElement);
    // Recipe Saved Successfully
    dispatch({
      type: SAVE_RECIPE_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    // Recipe Save Encountered Error
    dispatch({
      type: SAVE_RECIPE_ERROR,
      payload: e.message
    });
  }
};

export const resetSavedRecipe = () => async dispatch => {
  console.log("dispatching SAVE_RECIPE_RESET");
  dispatch({
    type: SAVE_RECIPE_RESET,
    payload: null
  });
};
