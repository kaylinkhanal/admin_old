import axios from "axios";
import {
  GET_STORE_TYPE,
  GET_MANAGER,
  GET_LOCATIONS,
  GET_CITYTAX
} from "./types";
import { Constants } from "../../constants/environment";
import Auth from "../../cookie/Auth";

export const getstore = () => dispatch => {
  axios
    .get(Constants.BASE_URL + "api/store-type", {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(res => {
      return dispatch({
        type: GET_STORE_TYPE,
        payload: res.data
      });
    });
};

export const getManagers = () => dispatch => {
  var user_id = Auth.getToken("userId");
  axios
    .get(Constants.BASE_URL + `api/users/managers/all/${user_id}`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(res => {
      return dispatch({
        type: GET_MANAGER,
        payload: res.data
      });
    });
};

// export const getCityTax = () => dispatch => {
//   var user_id = Auth.getToken("userId");
//   axios
//     .get(Constants.BASE_URL + `/api/settings/salestax/${user_id}`, {
//       headers: {
//         //"content-type": "application/json",
//         Authorization: "Bearer " + Auth.getToken("token")
//       }
//     })
//     .then(res => {
//       console.log("getCityTax Data", res.data[0].stateTax);
//       return dispatch({
//         type: GET_CITYTAX,
//         payload: res.data[0].stateTax
//       });
//     })
//     .catch(error => {
//       //const errorMsg = error.message
//     });
// };

export const getLocations = () => dispatch => {
  var user_id = Auth.getToken("userId");
  axios
    .get(Constants.BASE_URL + `api/locations/restaurant/${user_id}`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(res => {
      return dispatch({
        type: GET_LOCATIONS,
        payload: res.data
      });
    });
};
