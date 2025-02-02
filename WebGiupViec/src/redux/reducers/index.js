import { combineReducers } from "redux";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./userReducer";
import primaryReducer from "./primaryReducer";

const reducers = combineReducers({
  primary: primaryReducer,
  user: userReducer,
  wishlist: wishlistReducer,
});

export default reducers;
