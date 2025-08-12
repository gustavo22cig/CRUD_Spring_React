import Swal from "sweetalert2";
import { clientsReducer } from "../reducers/clientsReducer";
import { useReducer, useState } from "react";
import { deleteClient, findAll, saveClient, updateClient } from "../services/ClientService";

// Datos iniciales de clientes
const clientes = [];

const initialClientForm = {
  id: 0,
  nombre: "",
  paterno: "",
  materno: "",
  tipoDocumento: "",
  documentoIdentidad: "",
  fechaNacimiento: "",
  genero: "",
};
export const useClients = () => {
  const [clients, dispatch] = useReducer(clientsReducer, clientes);
  const [clientSelected, setClientSelected] = useState(initialClientForm);

  const [visibleForm, setVisibleForm] = useState(false);

  // obtiene la lista de clientes
  // desde el servicio y actualiza el estado
  const getClients = async () => {
    try {
      const result = await findAll();
      dispatch({
        type: "LOAD_CLIENTS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // inserta o actualiza un cliente
  const handleAddClient = async(newClient) => {

    let response;
    if(newClient.id === 0){
      
       response = await saveClient(newClient);
    }else{
       response = await updateClient(newClient);
    }

    dispatch({
      type: (newClient.id === 0) ? "ADD_CLIENT" : "UPDATE_CLIENT",
      payload: response.data,
    });

    
    

    Swal.fire({
      position: "center",
      icon: "success",
      title: newClient.id === 0
        ? "Cliente creado exitosamente"
        : "Cliente actualizado exitosamente",
      showConfirmButton: false,
      timer: 1500
    });

    handlerCloseForm();

  };
  // eliminar un cliente
  const handleDeleteClient = (clientId) => {
    Swal.fire({
      title: "Esta seguro de eliminar este cliente?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient(clientId);
        dispatch({
          type: "DELETE_CLIENT",
          payload: clientId,
        });
        Swal.fire({
          title: "Eliminado!",
          text: "El cliente ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };

  //selecciona el cliente para actualizar
  const handleUpdateClient = (updatedClient) => {
    setVisibleForm(true);
    setClientSelected({ ...updatedClient });
  };

  // abrir y cerrar el formulario
  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setClientSelected(initialClientForm);
  };

  return {
    clients,
    clientSelected,
    initialClientForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handleAddClient,
    handleDeleteClient,
    handleUpdateClient,
    getClients,
  };
};
