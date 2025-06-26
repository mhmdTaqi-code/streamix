import { combineReducers } from "redux";
import AuthReduser from "./AuthReducer"
import CatgReducer from "./catgReducer";
import themeReducer from "./themeReducer";


export default combineReducers({authReducer:AuthReduser ,    theme: themeReducer,catg:CatgReducer })