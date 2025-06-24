import { GetALLCatg, GetErr } from "../type";
import Baseurl from "../../Api/BaceUrl"


const GETALLCAT = () => async (dispatch) => {
  try {
    const res = await Baseurl.get("/live/api/streams/?categories=1");
    console.log("API Response:", res.data); // افحص هنا شنو يرجّع

    dispatch({
      type: GetALLCatg,
      payload: res.data, // أو res.data.data حسب بنية الرد
    });
  } catch (e) {
    console.error("API Error:", e);
    dispatch({
      type: GetErr,
      payload: e.message || "Something went wrong",
    });
  }
};

export default GETALLCAT