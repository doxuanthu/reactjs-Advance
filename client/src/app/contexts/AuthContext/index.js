import React, { useState } from "react";
import authContext from "./context";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
