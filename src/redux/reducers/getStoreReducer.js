import {
  GET_STORE_TYPE,
  GET_MANAGER,
  GET_LOCATIONS
  //GET_CITYTAX
} from "../actions/types";

const initialState = {
  store_type: {},
  manager: [],
  locations: {}
  //tax: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_TYPE:
      return {
        ...state,
        store_type: action.payload
      };
    // case GET_CITYTAX:
    //   return {
    //     ...state,
    //     tax: action.payload
    //   };
    case GET_MANAGER:
      return {
        ...state,
        manager: action.payload
      };
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };

    default:
      return state;
  }
}
