import axios from "axios";
import { LOGIN_USER } from "../type";
import axiosInstance from "../../Api/axiosInstance";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/login/", userData);

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
