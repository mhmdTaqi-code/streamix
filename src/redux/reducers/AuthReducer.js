// File: src/redux/reducers/AuthReducer.js
import { LOGIN_USER } from "../type";

const initialState = {};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
};

export default AuthReducer;
