import axiosInstance from "./axiosInstance";

const Baseurl = axiosInstance.create({
  baseURL: "https://dev1hunter.pythonanywhere.com/",
});
export default Baseurl;
