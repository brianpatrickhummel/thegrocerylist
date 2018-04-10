import axios from "axios";
import { FETCH_USER } from "./types";

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
export const saveRecipe = (recipeId, data) => async dispatch => {
  const res = await axios.post(`/recipe/save/${recipeId}`, data);
  dispatch({ type: FETCH_USER, payload: res.data });
};
