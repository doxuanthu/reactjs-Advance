import React, { createContext, useState } from "react";
import { storage } from "../../services";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [visibleCart, setVisibleCart] = useState(false);
  const { getStoreItem } = storage("cart");
  const [cart, setCart] = useState(getStoreItem());
  const [numberOfProductsInCart, setNumberOfProductsInCart] = useState(0);

  return (
    <AppContext.Provider
      value={{
        visibleCart,
        setVisibleCart,
        cart,
        setCart,
        numberOfProductsInCart,
        setNumberOfProductsInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
