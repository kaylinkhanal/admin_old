import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import storeTypeReducer from "./storeTypesReducer";
import taxReducer from "./taxReducer";
import userReducer from "./userReducer";
import getStoreReducer from "./getStoreReducer";
import locationReducer from "./locationReducer";
import tagReducer from "./tagReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

export default combineReducers({
  categories: categoryReducer,
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
  storeType: storeTypeReducer,
  user: userReducer,
  toastr: toastrReducer,
  store_type: getStoreReducer,
  manager: getStoreReducer,
  location: locationReducer,
  staff: userReducer,
  storeowner: userReducer,
  products: productReducer,
  tags: tagReducer,
  newTag: tagReducer,
  editTag: tagReducer,
  getSingleTag: tagReducer,
  taxs: taxReducer
});
