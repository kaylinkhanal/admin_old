import {  GET_USER_DETAIL, GET_STORE_TYPE, GET_ALL_STAFF, STORE_OWNER_INFO} from "../actions/types";

const initialState = {
  user: {}, 
  store_type:{},
  staff: {},
  storeowner: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAIL:      
      return {
        ...state,
        user: action.payload
      }; 
    case GET_STORE_TYPE:      
      return {
        ...state,
        store_type: action.payload
      };          
    case GET_ALL_STAFF:
      return {
        ...state,
        staff: action.payload
      }  
    case STORE_OWNER_INFO:
      return {
        ...state,
        storeowner: action.payload
      }  
    default:
      return state;
  }
}
