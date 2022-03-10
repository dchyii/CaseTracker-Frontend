import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = import.meta.env.VITE_API_ENTRY;

let authTokens = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
// console.log("auth token", authTokens);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${authTokens?.access}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  // console.log("interceptor ran!");
  authTokens = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  if (authTokens) {
    // console.log("token exist");
    const accessToken = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      // console.log("access token:", accessToken);
      req.headers.Authorization = `Bearer ${authTokens.access}`;
      // console.log(req);
      return req;
    }
    const refreshToken = jwtDecode(authTokens.refresh);
    const refreshIsExpired = dayjs.unix(refreshToken.exp).diff(dayjs()) < 1;
    if (!refreshIsExpired) {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh,
      });
      localStorage.setItem("token", JSON.stringify(response.data));
      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    }
  } else {
    throw new axios.Cancel("Invalid credentials. Please sign in,");
  }
});

export default axiosInstance;
