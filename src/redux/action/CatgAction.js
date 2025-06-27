// File: redux/action/CatgAction.js

import { GetALLCatg, GetErr } from "../type";
import Baseurl from "../../Api/BaceUrl";

const GETALLCAT = () => async (dispatch) => {
  try {
    const res = await Baseurl.get("/live/api/categories/"); // ✅ التصحيح هنا
    console.log("Categories API Response:", res.data);

    dispatch({
      type: GetALLCatg,
      payload: res.data, // بناءً على شكل API اللي انت أرسلته
    });
  } catch (e) {
    console.error("Categories API Error:", e);
    dispatch({
      type: GetErr,
      payload: e.message || "Something went wrong",
    });
  }
};

export default GETALLCAT;
