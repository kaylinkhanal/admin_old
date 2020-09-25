import { GET_STORETAXS } from "../actions/types";

const initialState = {
  tax: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORETAXS:
      return {
        ...state,
        tax: action.payload
      };
    default:
      return state;
  }
}
