import React from "react";
import { useContext } from "react";
import { AccountForm } from "./AccountForm";
import { useParams } from "react-router-dom";


export const AccountModalForm = ({ idClient, accountSelected, initialAccountForm, handlerAddAccount, handlerCloseFormAccount }) => {
  
  return (
    <>
      <div className="abrir-modal animacion fadeIn">
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog  modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title px-4">
                  {accountSelected.id > 0 ? "Editar Cuenta" : "Agregar Cuenta"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={handlerCloseFormAccount}
                ></button>
              </div>
              <div className="modal-body">
                <AccountForm
                  initialAccountForm={initialAccountForm}
                  handlerAddAccount={handlerAddAccount}
                  accountSelected={accountSelected}
                  handlerCloseFormAccount={handlerCloseFormAccount}
                  idClient={idClient}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
