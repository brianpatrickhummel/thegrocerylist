import {
  RETRIEVE_RECIPE,
  RETRIEVE_RECIPE_SUCCESS,
  RETRIEVE_RECIPE_ERROR,
  RETRIEVE_RECIPE_RESET
} from "../actions/types";

const INITIAL_STATE = {
  recipe: {},
  loading: false,
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE_RECIPE:
      console.log("reducer: loading");
      return { recipe: {}, loading: true, error: null };

    case RETRIEVE_RECIPE_SUCCESS:
      console.log("reducer: success");
      return { recipe: action.payload, loading: false, error: null };

    case RETRIEVE_RECIPE_ERROR:
      console.log("reducer: error");
      let error = action.payload || { message: action.payload.message };
      return { recipe: {}, loading: false, error: error };

    case RETRIEVE_RECIPE_RESET:
      return INITIAL_STATE;

    default:
      return INITIAL_STATE;
  }
}
