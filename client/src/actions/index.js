import axios from "axios";
import { FETCH_USER, SAVE_RECIPE, SAVE_RECIPE_SUCCESS, SAVE_RECIPE_ERROR, SAVE_RECIPE_RESET } from "./types";

// Gather User Model from MongoDB (for credits/survey data)
// redux-thunk allows us to return a function (with access to dispatch()) from action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // Pass updated User Model to Redux Store
  dispatch({ type: FETCH_USER, payload: res.data }); // user profile info is stored in .data
};

// refactored from:
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/current_user")
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//     };
//   };

// change primary social media account
export const setPrimary = setPrimaryAccountType => async dispatch => {
  const res = await axios.post(`/api/setPrimary/${setPrimaryAccountType}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// unlink social media account
export const connectAccount = connectAccountType => async dispatch => {
  const res = await axios.get(`/connect/${connectAccountType}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// unlink social media account
export const unlinkAccount = unlinkAccountType => async dispatch => {
  const res = await axios.post(`/unlink/${unlinkAccountType}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// updating preferences for Diet, Cuisine and Intolerances (dictate by "prefType" parameter)
export const updatePrefs = (checkedList, prefType) => async dispatch => {
  const res = await axios.post(`/api/updatePrefs/${prefType}`, checkedList);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Save Single Recipe
// export const saveRecipe = (recipeId, dataElement) => async dispatch => {
//   const res = await axios.post(`/recipe/save/${recipeId}`, dataElement);
//   dispatch({ type: FETCH_USER, payload: res.data });
//   console.log("saveRecipe action finished");
// };

export const saveRecipe = (recipeId, dataElement) => async dispatch => {
  console.log("dispatching SAVE_RECIPE");
  dispatch({
    type: SAVE_RECIPE,
    payload: null
  });

  try {
    const res = await axios.post(`/recipe/save/${recipeId}`, dataElement);

    console.log("dispatching SAVE_RECIPE_SUCCESS");
    dispatch({
      type: SAVE_RECIPE_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    // catch errors here

    console.log("dispatching SAVE_RECIPE_ERROR");
    console.log("e.message: ", e.message);
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
