import React, { useContext, useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ClientContext } from "../Context/ClientContext";
import { AccountList } from "../components/Accounts/AccountList";
import { AccountForm } from "../components/Accounts/AccountForm";
import { useAccounts } from "../hooks/useAccounts";
import { AccountModalForm } from "../components/Accounts/AccountModalForm";


export const AccountsPage = () => {

  const { clients, initialClientForm } = useContext(ClientContext);
  const { id } = useParams();



  const idClient = parseInt(id, 10);

    


  const cliente =
    clients.find((client) => client.id === parseInt(id)) || initialClientForm;

  

  const {
    accounts,
    accountSelected,
    initialAccountForm,
    handlerAddAccount,
    handlerRemoveAccount,
    handlerAccountSelectedForm,
    handlerOpenFormAccount,
    handlerCloseFormAccount,
    visibleFormAccount,
    getAccounts,
    getAccountsByClientId,
    handlerUpdateAccount,
    
  } = useAccounts();

  useEffect(() => {
    getAccountsByClientId(id);
  }, []);

  return (
    <>
      {!visibleFormAccount || (
          <AccountModalForm
            initialAccountForm={initialAccountForm}
            accountSelected={accountSelected}
            handlerAddAccount={handlerAddAccount}
            handlerCloseFormAccount={handlerCloseFormAccount}
            idClient={idClient}
          ></AccountModalForm>
      )}

      <div className="container-fluid">
        <h1 className="my-4 text-secondary">Cuentas registradas</h1>

        <div className="row">
          <div className="col">
            <p style={{ fontSize: "1.3rem" }}>
              <strong>
                Cliente: {cliente.nombre} {cliente.paterno} {cliente.materno}
              </strong>
            </p>
            <p style={{ fontSize: "1.3rem" }}>
              <strong>{cliente.tipoDocumento}:</strong>{" "}
              {cliente.documentoIdentidad}{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end mb-3">
            <NavLink
              to="/list-clients"
              className="btn btn-outline-secondary me-3"
            >
              <i className="fas fa-arrow-left mx-1"></i> Volver a Clientes
            </NavLink>
            <button 
              className="btn btn-primary px-4"
              onClick={handlerOpenFormAccount}
            >
              <i className="fas fa-plus mx-1"></i> Aperturar Cuenta
            </button>
          </div>
        </div>
        <div className="row"></div>
        <div className="col">
          {accounts.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No hay cuentas registradas para este cliente.
            </div>
          ) : (
            <AccountList
              accounts={accounts}
              handlerRemoveAccount={handlerRemoveAccount}
              handlerAccountSelectedForm={handlerAccountSelectedForm}
            />
          )}
        </div>
      </div>
    </>
  );
};


