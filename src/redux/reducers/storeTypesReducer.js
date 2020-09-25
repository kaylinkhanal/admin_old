import { ADD_NEW_STORE_TYPE } from "../actions/types";
import admin_navigation from "../../admin_nav";
import Auth from "../../cookie/Auth.js";
import axios from "axios";
import { Constants } from "../../constants/environment";

let store_types = [];
let format_store_types = [];
let initialState = [];
var role = Auth.getToken("role");
const getStoreTypes = async () => {
  let res = await axios.get(Constants.BASE_URL + "api/store-type", {
    headers: {
      //"content-type": "application/json",
      Authorization: "Bearer "+Auth.getToken('token'),
    }
    });
  store_types = await res.data;
  store_types&&store_types.map((store_type, index) => {
    format_store_types[index] = {
      name: store_type.storeTypeName,
      url: "/Users/Administrator/StoreOwners/" + store_type.storeTypeName,
      icon: "icon-puzzle"
    };
  });
  initialState = admin_navigation;
  
    initialState.items[2].children = format_store_types;

  return initialState;
};

export default function(state = getStoreTypes(), action) {
  switch (action.type) {
    case ADD_NEW_STORE_TYPE:
      //console.log("////", action.new_nav_config);
      return {
        currentdata: action.new_nav_config
      };
    default:
      return state;
  }
}
