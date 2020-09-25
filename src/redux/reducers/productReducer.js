import {  GET_SINGLE_PRODUCT,RESET_SINGLE_PRODUCT, GET_ALL_PRODUCT } from "../actions/types";

const initialState = {
  product: {}, 
  products:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:      
      return {
        ...state,
        product: action.payload
      };    
    case RESET_SINGLE_PRODUCT:      
    return {
      ...state,
      product: {}
    };   
    case GET_ALL_PRODUCT:
      return {
        ...state,
        products:action.payload
      }        
    default:
      return state;
  }
}
