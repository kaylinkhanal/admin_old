import { ADD_NEW_STORE_TYPE  } from "./types";
// import axios from "axios";
// import { Constants } from "../../constants/environment";
import navConfig from "../../_nav";

export const getStoreTypesAction = new_store_types => dispatch => {
  
  let new_nav_config = { ...navConfig };
  const new_store_links = new_store_types.map(store_type => {
    return {
      name: store_type.storeTypeName,
      url: "/Users/Administrator/StoreOwners/" + store_type.storeType,
      icon: "icon-puzzle"
    };
  });
  new_nav_config.items = new_nav_config.items.map((item, index) => {
    if (index === 2) {
      return {
        ...item,
        children: new_store_links
      };
    }
    return item;
  });
 
  //console.log('///', new_nav_config)
  return dispatch({
    type: ADD_NEW_STORE_TYPE,
    new_nav_config: new_nav_config
  });
};



