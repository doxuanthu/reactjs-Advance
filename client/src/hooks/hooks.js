import { useContext } from "react";
import { AppContext, AuthContext } from "../app/contexts";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useApp = () => {
  return useContext(AppContext);
};
