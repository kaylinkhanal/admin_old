import { GET_ORDER_USER,GET_ORDER_LOCATION,ORDER_UPDATE,RESET_UPDATE_STATUS,RESET_ORDERS,ORDER_UPDATE_BY_OPTIONS,RESET_UPDATED_OPTIONS } from "../actions/types";

const initialState = {
  orders: [], 
  updatedOrder:[],
  updatedOption:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_USER:      
      return {
        ...state,
        orders: action.payload
      };   
      case GET_ORDER_LOCATION:      
      return {
        ...state,
        orders: action.payload
      };   
      case ORDER_UPDATE:      
      return {
        ...state,
        updatedOrder: action.payload
      };   
      case ORDER_UPDATE_BY_OPTIONS:      
      return {
        ...state,
        updatedOption: action.payload
      };  
      case RESET_UPDATED_OPTIONS:
      return {
        ...state,
        updatedOption: []
      };  
      case RESET_UPDATE_STATUS:      
      return {
        ...state,
        updatedOrder: action.payload
      };  
      case RESET_ORDERS:      
      return {
        ...state,
        orders: []
      };   
    default:
      return state;
  }
}
