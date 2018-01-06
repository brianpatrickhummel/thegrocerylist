import axios from "axios";
import { FETCH_USER } from "./types";

// Gather User Model from MongoDB (for credits/survey data)
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // Pass updated User Model to Redux Store
  dispatch({ type: FETCH_USER, payload: res.data }); // user profile info is stored in .data
};
