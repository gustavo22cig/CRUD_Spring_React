import { useContext, useEffect } from "react";
import { ClientForm } from "../components/Clients/ClientForm";
import { ClientModalForm } from "../components/Clients/ClientModalForm";
import { ClientsList } from "../components/Clients/ClientsList";
import { useClients } from "../hooks/useClients";
import { ClientContext } from "../Context/ClientContext";


export const ClientsPage = () => {
  
  const { 
    clients,  
    visibleForm, 
    handlerOpenForm, 
    getClients,
  } = useContext(ClientContext);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      {visibleForm && (
        <ClientModalForm />
      )}

      <div className="container-fluid">

        <h1 className="my-4 text-secondary">Gestion de clientes</h1>

        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end mb-3">
              <button
                className="btn btn-primary px-4"
                onClick={handlerOpenForm}
              >
                <i className="fas fa-user-plus mx-1"></i>  Agregar Cliente
              </button>
            </div>
            
            {clients.length === 0 ? (
              <div className="alert alert-warning text-center" role="alert">
                No hay clientes registrados.
              </div>
            ) : (
              <ClientsList />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
