import axios from "axios";
import { GET_TAGS, NEW_TAG, EDIT_TAG, GET_SINGLE_TAG  } from "./types"
import { Constants } from "../../constants/environment";
import Auth from "../../cookie/Auth";

export const getTags = () =>dispatch=>{

    var user_id = Auth.getToken('userId');
    axios.get(Constants.BASE_URL + `api/tags?store=${user_id}`,
    {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(res => {
      return dispatch({
        type: GET_TAGS,
        payload: res.data
        });
  })
  }

export const createTag = (data) => dispatch => {
  var user_id = Auth.getToken('userId');
  axios.post(Constants.BASE_URL + `api/tags?store=${user_id}`, data,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
  .then(res=>{
              return dispatch({
                type: NEW_TAG,
                payload: res.data
              })
          })
}

export const editTag = ( id, data ) => dispatch => {

  axios.put(Constants.BASE_URL + `api/tags/${id}`,data, {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
  .then(res=>{
              return dispatch({
                type: EDIT_TAG,
                payload: res.data
              })
          })

}

export const getSingleTag = (id) => dispatch => {
  axios.get(Constants.BASE_URL + `api/tags/${id}`,
  {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  })
    .then(res=>{
      return dispatch({
        type: GET_SINGLE_TAG,
        payload: res.data.tag
      })
    })
}
