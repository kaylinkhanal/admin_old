import axios from "axios";
import {  GET_LOCATIONS, NEW_LOCATION } from "./types"
import { Constants } from "../../constants/environment";
import Auth from "../../cookie/Auth";
import {toastr} from 'react-redux-toastr';


export const getLocations = () => dispatch => {
    var user_id = Auth.getToken("userId");
    axios.get(Constants.BASE_URL + `api/locations/restaurant/${user_id}`,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    }).then(res => {
      return dispatch({
        type: GET_LOCATIONS,
        payload: res.data
      })
    });
  }
  
export const createNewlocation = (newlocation) => dispatch => {
    var user_id = Auth.getToken("userId");
    axios.post(Constants.BASE_URL + `api/locations/`, newlocation, 
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res => {
        return dispatch({
            type: NEW_LOCATION,
            payload: res.data
        })
    })
}