import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  // test to ensure that action is received from dispatch in action creator
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}
