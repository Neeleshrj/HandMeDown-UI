import { createContext } from "react";
import Constants from "expo-constants";

export const EnvContext = createContext();

export default function EnvProvider({ children }) {
  const baseURL = Constants.manifest.extra.baseURL;

  return(
    <EnvContext.Provider value={{baseURL: baseURL}}>{children}</EnvContext.Provider>
  )
}