import { useContext } from "react";
import authContext from "../app/contexts/AuthContext/context";
import { AppContext } from "../app/contexts/AppContext/AppProvider";

export const useAuth = () => {
  return useContext(authContext);
};

export const useApp = () => {
  return useContext(AppContext);
};
