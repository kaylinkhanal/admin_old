import axios from "axios";
import { GET_SINGLE_PRODUCT,RESET_SINGLE_PRODUCT, GET_ALL_PRODUCT, ADD_NEW_PRODUCT } from "./types";
import { Constants } from "../../constants/environment";
import Auth from '../../cookie/Auth.js';



export const resetSingleProduct = ()=> dispatch => {
    
      return dispatch({
        type: RESET_SINGLE_PRODUCT,
        payload: {}
      })
   
};

export const eidtProduct = ()=> dispatch => {
  
};

export const getAllProduct = (id) => dispatch => {
  var user_id = Auth.getToken("userId");
  axios.get(Constants.BASE_URL+`api/products?location=${id}&store=${user_id}`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
     .then(async res=>{
      return dispatch({
        type: GET_ALL_PRODUCT,
        payload: await res.data
      })
   })
  
}


export const getSingleProduct = (id) => dispatch => {  
  var user_id = Auth.getToken('userId');
   axios.get(Constants.BASE_URL+`api/products/${id}`,
   {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
   .then(async res=>{
   let products = {};
   products = await res.data;
   axios.get(Constants.BASE_URL + `api/products/locationforproduct/${id}`,
   {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
   .then(res=>{
        let location = []
        res.data.map((value, index)=>{
          location.push(value.location_id)
        })
        products.locationData = location;
        return dispatch({
          type:GET_SINGLE_PRODUCT,
          payload:  products
        })
    })

  });
};
  
