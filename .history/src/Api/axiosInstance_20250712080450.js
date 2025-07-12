//src/Api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev1hunter.pythonanywhere.com",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "https://dev1hunter.pythonanywhere.com/api/token/refresh/",
          {
            refresh: localStorage.getItem("refreshToken"),
          }
        );
        const newAccess = res.data.access;
        localStorage.setItem("accessToken", newAccess);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest); // أعد المحاولة
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // أعِد المستخدم لتسجيل الدخول
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
