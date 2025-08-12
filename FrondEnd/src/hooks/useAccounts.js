import React, { useReducer, useState, useEffect } from "react";
import { accountsReducer } from "../reducers/accountsReducer";
import Swal from "sweetalert2";
import { findAll, findAccountsByClientId, saveAccount, updateAccount, deleteAccount } from "../services/AccountService";
import { useParams } from "react-router-dom";

const initialAccounts = [];
const initialAccountForm = {
  id: 0,
  tipo: "",
  numeroCuenta: "",
  moneda: "",
  monto: 0,
  fechaCreacion: "",
  sucursal: "",
};

export const useAccounts = () => {
  const [accounts, dispatch] = useReducer(accountsReducer, initialAccounts);
  const [accountSelected, setAccountSelected] = useState(initialAccountForm);
  const [visibleFormAccount, setVisibleFormAccount] = useState(false);
  const { id: clientId } = useParams();

  const getAccounts = async () => {
    try {
    const response = await findAll();
    dispatch({
        type: "LOAD_ACCOUNTS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const getAccountsByClientId = async (clientId) => {
    try {
      const response = await findAccountsByClientId(clientId);
      dispatch({
        type: "ACCOUNTS_BY_CLIENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching accounts by client ID:", error);
    }
  };

  const handlerAddAccount = async (account) => {
    let response;
    if (account.id === 0) {
      response = await saveAccount(account);
    } else {
      response = await updateAccount(account);
    }
    dispatch({
      type: (account.id === 0) ? "ADD_ACCOUNT" : "UPDATE_ACCOUNT",
      payload: response.data,
    });

    Swal.fire({
          position: "center",
          icon: "success",
          title: account.id === 0
            ? "Cuenta creada exitosamente"
            : "Cuenta actualizada exitosamente",
          showConfirmButton: false,
          timer: 1500
        });

    handlerCloseFormAccount();
  };

  const handlerUpdateAccount = (updatedAccount) => {
    setVisibleFormAccount(true);
    setAccountSelected({ ...updatedAccount });
  };

  const handlerRemoveAccount = (id) => {
    Swal.fire({
      title: "Esta seguro de eliminar este cuenta?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount(id);
        dispatch({
          type: "REMOVE_ACCOUNT",
          payload: id,
        });
        Swal.fire({
          title: "Eliminado!",
          text: "La cuenta ha sido eliminada.",
          icon: "success",
        });
      }
    });
  };

  const handlerAccountSelectedForm = (account) => {
    setVisibleFormAccount(true);
    setAccountSelected({ ...account });
  };

  const handlerOpenFormAccount = () => {
    setVisibleFormAccount(true);
  };

  const handlerCloseFormAccount = () => {
    setVisibleFormAccount(false);
    setAccountSelected(initialAccountForm);
  };


  return {
    accounts,
    accountSelected,
    initialAccountForm,
    visibleFormAccount,
    handlerAddAccount,
    handlerRemoveAccount,
    handlerAccountSelectedForm,
    handlerOpenFormAccount,
    handlerCloseFormAccount,
    getAccounts,
    getAccountsByClientId,
    handlerUpdateAccount,
  };
};
