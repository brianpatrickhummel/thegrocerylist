import { DELETE_RECIPE, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_ERROR, DELETE_RECIPE_RESET } from "../actions/types";

const INITIAL_STATE = {
  recipe: {},
  loading: false,
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_RECIPE:
      console.log("reducer: loading");
      return { recipe: {}, loading: true, error: null };

    case DELETE_RECIPE_SUCCESS:
      console.log("reducer: success");
      return { recipe: action.payload, loading: false, error: null };

    case DELETE_RECIPE_ERROR:
      console.log("reducer: error");
      let error = action.payload || { message: action.payload.message };
      return { recipe: {}, loading: false, error: error };

    case DELETE_RECIPE_RESET:
      return INITIAL_STATE;

    default:
      return INITIAL_STATE;
  }
}
