// File: src/redux/actions/authActions.js
import axios from "axios";
import { LOGIN_USER } from "../type";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("https://devhunter123.pythonanywhere.com/api/login/", userData);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER,
      payload: { error: error.response?.data?.error || "فشل تسجيل الدخول" },
    });
  }
};
