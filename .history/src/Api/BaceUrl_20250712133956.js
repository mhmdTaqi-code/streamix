import axiosInstance from "./axiosInstance";

const Baseurl = axiosInstance.create({
 baseURL: "https://api.allorigins.win/raw?url=https://dev1hunter.pythonanywhere.com"
});
export default Baseurl;
