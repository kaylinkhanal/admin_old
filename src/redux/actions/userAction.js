import axios from "axios";
import { GET_USER_DETAIL, GET_STORE_TYPE, GET_ALL_STAFF, STORE_OWNER_INFO } from "./types"
import { Constants } from "../../constants/environment";
import Auth from '../../cookie/Auth.js';
import { bindActionCreators } from "redux";

export const getUserById = user_id => dispatch => {   
//   let config = {
//     headers: {
//       Authorization: "Bearer "+Auth.getToken('token'),
//     }
//   }  
  axios
    .get(
      Constants.BASE_URL +
        'api/users/'+user_id,
        {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer "+Auth.getToken('token'),
          }
        }
    )
    .then(result =>{         
        return dispatch({
          type: GET_USER_DETAIL,
          payload: result.data        
        })
    }
      
    );
};

export const getStaff =() => dispatch => {
  var id = Auth.getToken('userId');
  axios.get(Constants.BASE_URL + `api/users/staff/all/${id}`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
    .then(res=>{
      return dispatch({
        type: GET_ALL_STAFF,
        payload: res.data
      })      
  });
}

export const getStoreOwner = () =>dispatch=> {
  var id = Auth.getToken('userId');
  axios.get(Constants.BASE_URL + `api/store/store-owner/${id}`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }).then(async res => {
    const data = await res.data;
    return dispatch({
      type: STORE_OWNER_INFO,
      payload: res.data
    })
   });
}

