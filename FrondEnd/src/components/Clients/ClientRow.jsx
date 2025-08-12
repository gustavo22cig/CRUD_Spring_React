import React, { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";
import { NavLink } from "react-router-dom";

export const ClientRow = ({ id, nombre, paterno, materno, tipoDocumento, documentoIdentidad, fechaNacimiento, genero }) => {

  const { handleDeleteClient, handleUpdateClient } = useContext(ClientContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{paterno}</td>
      <td>{materno}</td>
      <td>{tipoDocumento}</td>
      <td>{documentoIdentidad}</td>
      <td>{fechaNacimiento}</td>
      <td>{genero}</td>
      <td>
        <div className="d-flex flex-column flex-sm-row gap-2">

          <NavLink className="btn btn-success btn-sm me-2 d-flex align-items-center" to={`/accounts/${id}`}>
            <i className="fas fa-money-check-alt mx-1"></i> Aperturar Cuenta
          </NavLink>

          <button 
            className="btn btn-info btn-sm me-2 d-flex align-items-center"
            onClick={() => handleUpdateClient({
              id,
              nombre,
              paterno,
              materno,
              tipoDocumento,
              documentoIdentidad,
              fechaNacimiento,
              genero
            })}
          >
            <i className="fas fa-edit mx-1"></i> Editar
          </button>
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={() => handleDeleteClient(id)}
          >
            <i className="fas fa-trash mx-1"></i> Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};
