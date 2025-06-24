import { combineReducers } from "redux";
import AuthReduser from "./AuthReducer"
import CatgReducer from "./catgReducer";
export default combineReducers({auth:AuthReduser , catg:CatgReducer })