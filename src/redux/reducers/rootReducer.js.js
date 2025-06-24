import { combineReducers } from "redux";
import AuthReduser from "./AuthReducer"
import CatgReducer from "./catgReducer";
export default combineReducers({authReducer:AuthReduser , catg:CatgReducer })