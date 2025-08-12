
import { ClientRow } from "./ClientRow";
import { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";


export const ClientsList = () => {

  const { 
    clients,  
  } = useContext(ClientContext);

    return (
    <>
    <div className="card shadow ">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover "> 
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
              <th>Ap. Paterno</th>
              <th>Ap. Materno</th>
              <th>Tipo Doc.</th>
              <th>Nro. Documento</th>
              <th>Fecha Nacimiento</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(({id, nombre, paterno, materno, tipoDocumento, documentoIdentidad, fechaNacimiento, genero}) => (
              <ClientRow 
                key={id}
                id={id}
                nombre={nombre}
                paterno={paterno}
                materno={materno}
                tipoDocumento={tipoDocumento}
                documentoIdentidad={documentoIdentidad}
                fechaNacimiento={fechaNacimiento}
                genero={genero}
              />
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    </>
  );
};
