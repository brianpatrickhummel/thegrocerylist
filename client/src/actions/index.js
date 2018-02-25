import axios from "axios";
import { FETCH_USER } from "./types";

// Gather User Model from MongoDB (for credits/survey data)
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // Pass updated User Model to Redux Store
  dispatch({ type: FETCH_USER, payload: res.data }); // user profile info is stored in .data
};

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
