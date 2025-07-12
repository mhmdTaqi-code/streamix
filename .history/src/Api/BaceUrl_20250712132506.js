import axiosInstance from "./axiosInstance";

const Baseurl = axiosInstance.create({
 baseURL: "https://thingproxy.freeboard.io/fetch/https://dev1hunter.pythonanywhere.com"
});
export default Baseurl;
