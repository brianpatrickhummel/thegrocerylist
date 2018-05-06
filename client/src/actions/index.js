import axios from "axios";
import {
  FETCH_USER,
  SAVE_RECIPE,
  SAVE_RECIPE_SUCCESS,
  SAVE_RECIPE_ERROR,
  SAVE_RECIPE_RESET,
  RETRIEVE_RECIPE,
  RETRIEVE_RECIPE_SUCCESS,
  RETRIEVE_RECIPE_ERROR,
  RETRIEVE_RECIPE_RESET,
  DELETE_RECIPE,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_ERROR,
  DELETE_RECIPE_RESET
} from "./types";

// Gather User Model from MongoDB redux-thunk allows us to return a function
// (with access to dispatch()) from action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({type: FETCH_USER, payload: res.data});
};

// Change primary social media account
export const setPrimary = setPrimaryAccountType => async dispatch => {
  const res = await axios.post(`/api/setPrimary/${setPrimaryAccountType}`);
  dispatch({type: FETCH_USER, payload: res.data});
};

// Connect social media account
export const connectAccount = connectAccountType => async dispatch => {
  const res = await axios.get(`/connect/${connectAccountType}`);
  dispatch({type: FETCH_USER, payload: res.data});
};

// Unlink social media account
export const unlinkAccount = unlinkAccountType => async dispatch => {
  const res = await axios.post(`/unlink/${unlinkAccountType}`);
  dispatch({type: FETCH_USER, payload: res.data});
};

// Update Prefs for Diet, Cuisine and Intolerances (dictated by "prefType"
// parameter)
export const updatePrefs = (checkedList, prefType) => async dispatch => {
  const res = await axios.post(`/api/updatePrefs/${prefType}`, checkedList);
  dispatch({type: FETCH_USER, payload: res.data});
};

// Save Single Recipe
export const saveRecipe = (recipeId, cuisine, dataElement) => async dispatch => {
  // Begin Save, Display Loading Indicator
  dispatch({type: SAVE_RECIPE, payload: null});

  try {
    const res = await axios.post(`/recipe/save/${cuisine}/${recipeId}`, dataElement);
    // Recipe Saved Successfully
    console.log("saveRecipe res: ", res);
    dispatch({type: SAVE_RECIPE_SUCCESS, payload: res.data.recipe});
    dispatch({type: FETCH_USER, payload: res.data.user});
  } catch (e) {
    // console.log("dispatching SAVE_RECIPE_ERROR"); console.log("action creator
    // error", e); Recipe Save Encountered Error
    dispatch({type: SAVE_RECIPE_ERROR, payload: e.message});
  }
};

// RESET Save_Recipe State
export const resetSavedRecipe = () => async dispatch => {
  // console.log("dispatching SAVE_RECIPE_RESET");
  dispatch({type: SAVE_RECIPE_RESET, payload: null});
};

// RetrieveOne Recipe's Information from Mongo
export const retrieveRecipe = recipeId => async dispatch => {
  console.log("retrieve id", recipeId);
  // Begin retrieving, Display Loading Indicator
  dispatch({type: RETRIEVE_RECIPE, payload: null});

  try {
    const res = await axios.get(`/recipe/retrieve/${recipeId}`);
    console.log("retrieve action success results are: ", res);
    dispatch({type: RETRIEVE_RECIPE_SUCCESS, payload: res.data[0]});
  } catch (e) {
    dispatch({type: RETRIEVE_RECIPE_ERROR, payload: e.message});
  }
};

//RESET RETRIEVE_RECIPE State
export const resetRetrieveRecipe = () => async dispatch => {
  // console.log("dispatching RETRIEVE_RECIPE_RESET");
  dispatch({type: RETRIEVE_RECIPE_RESET, payload: null});
};

// Delete One Recipe's Information from Mongo
export const deleteRecipe = (recipeId, cuisine) => async dispatch => {
  console.log("ACTION DELETE_RECIPE running");
  // Begin Delete, Display Loading Indicator
  dispatch({type: DELETE_RECIPE, payload: null});

  try {
    const res = await axios.post(`/recipe/delete/${recipeId}/${cuisine}`);
    console.log("delete response: ", res);
    dispatch({type: FETCH_USER, payload: res.data.user});
    dispatch({type: DELETE_RECIPE_SUCCESS, payload: res.data.recipe});
  } catch (e) {
    console.log("delete error response: ", e);
    console.log("delete error response status: ", e.statusMessage);
    dispatch({type: DELETE_RECIPE_ERROR, payload: e.message});
  }
};

// RESET DELETE_RECIPE State
export const resetDeleteRecipe = () => async dispatch => {
  // console.log("dispatching DELETE_RECIPE_RESET");
  dispatch({type: DELETE_RECIPE_RESET, payload: null});
};
