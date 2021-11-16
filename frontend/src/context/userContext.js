import { createContext, useState } from "react";
import TokenService from "../services/TokenService";

const UserContext = createContext(null);

export { UserContext };

export const AuthProvider = ({ children }) => {
  let [userLogin, setUserLogin] = useState(
    () => TokenService.getAuthTokens() !== null
  );

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};
