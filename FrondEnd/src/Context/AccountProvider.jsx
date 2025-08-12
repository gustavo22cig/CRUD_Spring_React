import React, { createContext } from "react";
import { AccountContext } from "./AccountContext";
import { useClients } from "../hooks/useClients";



export const AccountProvider = ({ children }) => {
 
  return (
    <AccountContext.Provider value=
    {
      useClients()
    }>
      {children}
    </AccountContext.Provider>
  );
}
        