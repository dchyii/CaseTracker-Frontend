import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = import.meta.env.VITE_API_ENTRY;

let authTokens = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
console.log("auth token", authTokens);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${authTokens?.access}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log("interceptor ran!");
  if (!authTokens) {
    console.log("!authTokens");
    authTokens = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }

  const accessToken = jwtDecode(authTokens.access);
  console.log(accessToken);
  const isExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/token/refresh/`, {
    refresh: authTokens.refresh,
  });
  console.log("refresh response: ", response);
  localStorage.setItem("token", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
