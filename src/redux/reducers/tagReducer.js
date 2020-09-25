import { GET_TAGS, NEW_TAG, DELETE_TAG, EDIT_TAG, GET_SINGLE_TAG } from "../actions/types";

const initialState = {
  tags:{},
  newTag:{},
  editTag:{},
  getSingleTag:''
};

export default function(state = initialState, action) {
  switch (action.type) {
      
    case GET_TAGS:      
      return {
        ...state,
        tags: action.payload
      };  
    case NEW_TAG:
      return {
        ...state,
        newTag: action.payload
      }
    case EDIT_TAG:
      return {
        ...state,
        editTag: action.payload
      }
    case GET_SINGLE_TAG:
      return {
        ...state,
        getSingleTag: action.payload
      }
    default:
      return state;
  }
}
