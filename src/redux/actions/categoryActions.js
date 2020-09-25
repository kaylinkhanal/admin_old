import axios from "axios";
import {
  FETCH_CATEGORIES,
  NEW_CATEGORY,
  GET_SINGLE_CATEGORY,
  GET_ALL_CATEGORY
} from "./types";
import { Constants } from "../../constants/environment";
import Auth from "../../cookie/Auth.js";

export const fetchCategories = () => dispatch => {
  axios
    .get(Constants.BASE_URL + `api/categories/location/home`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(categories =>
      dispatch({
        type: FETCH_CATEGORIES,
        payload: categories.data
        //payload: categories.data.slice(0,10) //get first 10
      })
    );
};

export const createCategory = postData => dispatch => {
  console.log("action called- createCategory", postData);
  axios
    .post(Constants.BASE_URL + `api/categories/`, postData, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(newCategory =>
      dispatch({
        type: NEW_CATEGORY,
        payload: newCategory
      })
    )
    .catch(function(error) {
      console.log("ERROR", error);
    });
};

export const getSingleCategory = id => dispatch => {
  axios
    .get(Constants.BASE_URL + `api/categories/${id}`, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(res => {
      let category = {};
      category = res.data;
      axios
        .get(Constants.BASE_URL + `api/categories/locationforcategory/${id}`, {
          headers: {
            //"content-type": "application/json",
            Authorization: "Bearer " + Auth.getToken("token")
          }
        })
        .then(res => {
          let location = [];
          res.data.map((value, index) => {
            location.push(value.location_id);
          });
          dispatch({
            type: GET_SINGLE_CATEGORY,
            payload: location
          });
        });
    });
};

export const getAllCategory = (id, location) => dispatch => {
  var user_id = Auth.getToken("userId");
  axios
    .post(Constants.BASE_URL + `api/categories/location/${id}`, location, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer " + Auth.getToken("token")
      }
    })
    .then(async res => {
      //console.log(res.data);
      let data = res.data;
      let temp = [];
      if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
          let category = data[i];
          await axios
            .get(
              Constants.BASE_URL +
                `api/categories/locationforcategory/${category._id}`,
              {
                headers: {
                  //"content-type": "application/json",
                  Authorization: "Bearer " + Auth.getToken("token")
                }
              }
            )
            .then(res => {
              category.locationData = res.data;
            });
          await axios
            .get(
              Constants.BASE_URL +
                `api/products/category/${category._id}?store=${user_id}`,
              {
                headers: {
                  //"content-type": "application/json",
                  Authorization: "Bearer " + Auth.getToken("token")
                }
              }
            )
            .then(res => {
              category.productData = res.data.length;
              temp.push(category);
            });
          dispatch({
            type: GET_ALL_CATEGORY,
            payload: data
          });
        }
      } else {
        dispatch({
          type: GET_ALL_CATEGORY,
          payload: []
        });
      }
    });
};
