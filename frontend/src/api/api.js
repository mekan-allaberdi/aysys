import axios from "axios";
import TokenService from "../services/TokenService";

const baseURL = "http://localhost:8000";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + TokenService.getLocalAccessToken() || "Bearer " + "",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = TokenService.getLocalAccessToken();

//     if (accessToken) {
//       config.headers["Bearer"] = accessToken;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
