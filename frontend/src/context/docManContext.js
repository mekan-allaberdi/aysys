import { createContext, useState } from "react";

const DocManContext = createContext(null);

export { DocManContext };

export const DocManProvider = ({ children }) => {
  let [currentPath, setCurrentPath] = useState("root");

  return (
    <DocManContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </DocManContext.Provider>
  );
};
