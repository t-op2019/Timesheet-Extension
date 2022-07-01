import axios from "axios";

const url = "https://d392hd1u5yd463.cloudfront.net/api/";

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (response) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTFlM2MxM2RkMzBiNWQ0ZTZlZjNiMyIsImlhdCI6MTY1NjYwMTExNiwiZXhwIjoxNjg4MTM3MTE2fQ.GaN6-U50vo0fk22_k-z_Bkp0_GTJYnz_g_OrTjR-U0E";
    // if (!token) {
    //   localStorage.removeItem("token");
    // }
    response.headers.authorization = token ? `Bearer ${token}` : "";
    return response;
  },
  (error) => Promise.reject(error?.response)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
