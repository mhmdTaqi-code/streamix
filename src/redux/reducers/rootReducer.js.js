// File: redux/reducers/index.js

import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import CatgReducer from "./catgReducer";
import themeReducer from "./themeReducer";
import followingReducer from "./followingReducer"; // ✅ أضف هذا

export default combineReducers({
  authReducer: AuthReducer,
  theme: themeReducer,
  catg: CatgReducer,
  following: followingReducer, // ✅ أضف هذا هنا
});
