import React from "react";
import { ClientForm } from "./ClientForm";
import { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";

export const ClientModalForm = () => {

  const { clientSelected, handlerCloseForm } = useContext(ClientContext);
    return(

        <>
        <div className="abrir-modal animacion fadeIn">
          <div className="modal" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog  modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">

                  <h5 className="modal-title px-4">
                    { clientSelected.id > 0 ? "Editar Cliente" : "Agregar Cliente" }
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={handlerCloseForm}
                  ></button>
                </div>
                <div className="modal-body">
                  <ClientForm
                    clientSelected={clientSelected}
                    handlerCloseForm={handlerCloseForm}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </>

    );
}