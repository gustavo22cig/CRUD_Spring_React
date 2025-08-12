import { Navbar } from "../components/layout/Navbar";
import { ClientsPage } from "../pages/ClientsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { AccountsPage } from "../pages/AccountsPage";
import React from "react";
import { ClientProvider } from "../Context/ClientProvider";

export const ClientRoutes = () => {
  return (
    <>
      <ClientProvider>
        <Navbar />
        <Routes>
          <Route path="list-clients" element={<ClientsPage />} />
          <Route path="/" element={<Navigate to="list-clients" />} />
          <Route path="/accounts/:id" element={<AccountsPage />} />
          <Route path="list-account" element={<AccountsPage />} />
        </Routes>
      </ClientProvider>
    </>
  );
};
