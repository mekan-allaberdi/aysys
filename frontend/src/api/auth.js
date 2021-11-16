import TokenService from "../services/TokenService";
import api from "./api";

const login = (username, password) => {
  const loginBody = { username: username, password: password };

  return api
    .post("/auth/token/", loginBody)
    .then((response) => {
      console.log("STATUS", response.status);
      if (response.data.access) {
        TokenService.setAuthTokens(response.data);

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

const logout = () => {
  TokenService.removeAuthTokens();
};

export { login, logout };
