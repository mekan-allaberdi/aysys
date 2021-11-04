const AUTH_TOKENS = "auth-tokens";

class TokenService {
  getAuthTokens() {
    return JSON.parse(localStorage.getItem(AUTH_TOKENS));
  }

  getLocalRefreshToken() {
    return this.getAuthTokens()?.refresh;
  }

  getLocalAccessToken() {
    return this.getAuthTokens()?.access;
  }

  setAuthTokens(auth_tokens) {
    localStorage.setItem(AUTH_TOKENS, JSON.stringify(auth_tokens));
  }

  removeAuthTokens() {
    localStorage.removeItem(AUTH_TOKENS);
  }
}

export default new TokenService();
