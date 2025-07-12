import axios from "axios";
import { LOGIN_USER } from "../type";
import Baseurl from "../../Api/BaceUrl";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("https://thingproxy.freeboard.io/fetch/https://dev1hunter.pythonanywhere.com/api/login/", userData);

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
