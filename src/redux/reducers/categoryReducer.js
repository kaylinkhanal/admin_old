import { FETCH_CATEGORIES, NEW_CATEGORY, GET_SINGLE_CATEGORY, GET_ALL_CATEGORY } from "../actions/types";

const initialState = {
  items: [],
  categories: [],
  item: {},
  category: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log("categoryReducer FETCH", state);
      return {
        ...state,
        items: action.payload
      };
    case NEW_CATEGORY:
      console.log("categoryReducer NEW", state);
      return {
        ...state,
        item: action.payload
      };
    case GET_SINGLE_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    case GET_ALL_CATEGORY:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state;
  }
}
