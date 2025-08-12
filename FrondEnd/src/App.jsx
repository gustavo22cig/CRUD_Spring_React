import React from "react";
import { ClientsPage } from "./pages/ClientsPage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ClientRoutes } from "./routers/ClientRoutes";


export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/*" element={<ClientRoutes />} /> 
      </Routes>
    </>
  );
};
