import axios from "axios";

const isProd =
  typeof window !== "undefined" && window.location.hostname !== "localhost";

const axiosInstance = axios.create({
  baseURL: isProd
    ? "/api/proxy" // على Vercel: سيضرب دالة البروكسي
    : "http://localhost:8080/https://dev1hunter.pythonanywhere.com", // للتطوير مع cors-anywhere
});

// Authorization
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh flow 401
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      localStorage.getItem("refreshToken")
    ) {
      original._retry = true;
      try {
        const refreshUrl = isProd
          ? "/api/proxy/api/token/refresh/"
          : "http://localhost:8080/https://dev1hunter.pythonanywhere.com/api/token/refresh/";

        const { data } = await axios.post(refreshUrl, {
          refresh: localStorage.getItem("refreshToken"),
        });
        localStorage.setItem("accessToken", data.access);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        original.headers.Authorization = `Bearer ${data.access}`;
        return axiosInstance(original);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
