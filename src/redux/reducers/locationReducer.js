import { GET_LOCATIONS, NEW_LOCATION } from "../actions/types";

const initialState = {
  location: {},
  newlocation:{}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case GET_LOCATIONS:
      return {
        ...state,
        location: action.payload
      }
    case NEW_LOCATION:
        return {
            ...state,
            newlocation: action.payload
        }
    default:
      return state;
  }
}
