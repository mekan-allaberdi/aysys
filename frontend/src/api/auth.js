import axios from "axios";
import api from "./api";
import TokenService from "../services/TokenService";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const tokenRequest = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
  },
});

const login = (username, password) => {
  const loginBody = { username: username, password: password };

  return tokenRequest
    .post("/auth/token/", loginBody)
    .then((response) => {
      console.log("STATUS", response.status);
      if (response.data.access) {
        TokenService.setAuthTokens(response.data);
        const headerAuthorization = `Bearer ${TokenService.getLocalAccessToken()}`;
        api.defaults.headers["Authorization"] = headerAuthorization;
        return Promise.resolve();
      } else {
        console.log("STATUS", response.status);

        throw new Error("No authentication data");
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const refreshToken = () => {
  const refreshBody = { refresh: TokenService.getLocalRefreshToken() };
  return tokenRequest
    .post(`/auth/token/refresh/`, refreshBody)
    .then((response) => {
      TokenService.setAuthTokens(response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const isCorrectRefreshError = (status) => {
  return status === 401;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return errorInterceptor(error);
  }
);

const errorInterceptor = (error) => {
  const originalRequest = error.config;
  const status = error.response.status;
  if (isCorrectRefreshError(status)) {
    return refreshToken()
      .then((data) => {
        TokenService.setAuthTokens(data);
        const headerAuthorization = `Bearer ${TokenService.getLocalAccessToken()}`;
        api.defaults.headers["Authorization"] = headerAuthorization;
        originalRequest.headers["Authorization"] = headerAuthorization;
        return api(originalRequest);
      })
      .catch((error) => {
        logout();
        return Promise.reject(error);
      });
  }
  return Promise.reject(error);
};

const logout = async () => {
  return api
    .post("/auth/logout/", {
      refresh_token: TokenService.getLocalRefreshToken(),
    })
    .then(() => {
      TokenService.removeAuthTokens();
      api.defaults.headers["Authorization"] = "";
      return Promise.resolve();
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export { login, logout };
