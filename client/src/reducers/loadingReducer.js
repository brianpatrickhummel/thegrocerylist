import { IS_LOADING } from "../actions/types";

export default function(state = { isSpinning: false }, action) {
  // test to ensure that action is received from dispatch in action creator
  // console.log(action);
  switch (action.type) {
    case IS_LOADING:
      return action.payload || false;

    default:
      return state;
  }
}
