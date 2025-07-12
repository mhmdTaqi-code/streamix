// redux/action/followingAction.js
import axiosInstance from "../../Api/axiosInstance";
import { SET_FOLLOWING, REMOVE_FOLLOWING } from "../type";

export const getFollowing = () => async (dispatch) => {
  try {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("accessToken");

    if (!storedUsername || !token) return;

    const res = await axiosInstance.get(
      `https://dev1hunter.pythonanywhere.com/profile/${storedUsername}/following/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: SET_FOLLOWING,
      payload: res.data,
    });
  } catch (e) {
    console.error("Fetching following failed:", e);
  }
};

export const removeFollowing = (username) => ({
  type: REMOVE_FOLLOWING,
  payload: username,
});
