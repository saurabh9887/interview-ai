import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [spinner, setSpinner] = useState(false);

  return (
    <LoaderContext.Provider value={{ spinner, setSpinner }}>
      {children}
    </LoaderContext.Provider>
  );
};
