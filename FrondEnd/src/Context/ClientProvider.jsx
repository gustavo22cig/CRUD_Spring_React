import { ClientContext } from "./ClientContext";
import { useClients } from "../hooks/useClients";



export const ClientProvider = ({ children }) => {
  const {
        clients,
        clientSelected,
        initialClientForm,
        visibleForm,
        handleAddClient,
        handleDeleteClient,
        handleUpdateClient,
        handlerOpenForm,
        handlerCloseForm,
        getClients,
    } = useClients();

    return (
    <ClientContext.Provider value={{
        clients,
        clientSelected,
        initialClientForm,
        visibleForm,
        handleAddClient,
        handleDeleteClient,
        handleUpdateClient,
        handlerOpenForm,
        handlerCloseForm,
        getClients,
    }}>
      {children}
    </ClientContext.Provider>
  );
}