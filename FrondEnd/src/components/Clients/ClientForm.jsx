import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ClientContext } from "../../Context/ClientContext";


export const ClientForm = () => {
  
  //utilizar el useContext para obtener el contexto del cliente
  const { clientSelected, initialClientForm, handleAddClient, handlerCloseForm } = useContext(ClientContext);

  const [clientForm, setClientForm] = useState(initialClientForm);
  const { 
    id, 
    nombre, 
    paterno, 
    materno, 
    tipoDocumento, 
    documentoIdentidad, 
    fechaNacimiento, 
    genero 
  } = clientForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setClientForm({
      ...clientForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (Object.values(clientForm).some((value) => value === "")) {
      Swal.fire({
        title: "Error de validación",
        text: "Por favor, complete todos los campos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    console.log(clientForm);
    handleAddClient(clientForm);
    setClientForm(initialClientForm);
  };

  useEffect(() => {
    setClientForm({ ...clientSelected });
  }, [clientSelected]);

  const onCloseForm = () => {
    handlerCloseForm();
    
  };

  return (
    <>
      <form onSubmit={onSubmit} className="px-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            placeholder="Nombres"
            value={nombre}
            onChange={onInputChange}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <label htmlFor="paterno" className="form-label">
                Apellido Paterno
              </label>
              <input
                type="text"
                className="form-control"
                id="paterno"
                name="paterno"
                placeholder="Apellido Paterno"
                value={paterno}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <label htmlFor="materno" className="form-label">
                Apellido Materno
              </label>
              <input
                type="text"
                className="form-control"
                id="materno"
                name="materno"
                placeholder="Apellido Materno"
                value={materno}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <label htmlFor="tipoDocumento" className="form-label">
                Tipo de Documento
              </label>
              <select
                className="form-select"
                id="tipoDocumento"
                name="tipoDocumento"
                value={tipoDocumento}
                onChange={onInputChange}
              >
                <option value="" disabled>
                  Seleccione un tipo
                </option>
                <option value="Carnet">Carnet</option>
                <option value="NIT">NIT</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <label htmlFor="documentoIdentidad" className="form-label">
                Numero de Documento de Identidad
              </label>
              <input
                type="text"
                className="form-control"
                id="documentoIdentidad"
                name="documentoIdentidad"
                placeholder="Documento de Identidad"
                value={documentoIdentidad}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <label htmlFor="fechaNacimiento" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={fechaNacimiento}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <label htmlFor="genero" className="form-label">
                Género
              </label>
              <select
                className="form-select"
                id="genero"
                name="genero"
                value={genero}
                onChange={onInputChange}
              >
                <option value="" disabled>
                  Seleccione género
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
        </div>

        <input type="hidden" name="id" value={id} />

        <div className="modal-footer">
          <button className="btn btn-outline-secondary px-5" onClick={onCloseForm}>
            Cerrar
          </button>
          <button type="submit" className="btn btn-primary px-5">
            {clientForm.id > 0 ? "Actualizar" : "Guardar"}
          </button>
          
        </div>
      </form>
    </>
  );
};
