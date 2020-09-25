import axios from "axios";
import { GET_STORETAXS } from "./types";
import { Constants } from "../../constants/environment";
import Auth from "../../cookie/Auth";

export const getCityTax = () => dispatch => {
  var user_id = Auth.getToken("userId");
  axios
    .get(Constants.BASE_URL + `/api/settings/salestax/${user_id}`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(res => {
      dispatch({
        type: GET_STORETAXS,
        payload: res.data[0].stateTax
      });
    })
    .catch(error => {
      //const errorMsg = error.message
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
//       console.log("-getCityTaxs Data", res.data[0].stateTax);
//       return dispatch({
//         type: GET_STORETAXS,
//         payload: res.data[0].stateTax
//       });
//     })
//     .catch(error => {
//       //const errorMsg = error.message
//     });
// };
