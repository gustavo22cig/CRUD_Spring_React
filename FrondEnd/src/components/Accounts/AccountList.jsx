import { AccountRow } from "./AccountRow";
import { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";

export const AccountList = ({handlerAccountSelectedForm, handlerRemoveAccount, accounts }) => {


  return (
    <div className="card shadow ">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Nro. Cuenta</th>
                <th>Moneda </th>
                <th>Monto</th>
                <th>Fecha Creacion</th>
                <th>Sucursal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
              accounts.map(({id, tipo, numeroCuenta, moneda, monto, fechaCreacion, sucursal}) => (
                <AccountRow 
                  key={id} 
                  id={id} 
                  tipo={tipo} 
                  numeroCuenta={numeroCuenta} 
                  moneda={moneda} 
                  monto={monto}
                  fechaCreacion={fechaCreacion} 
                  sucursal={sucursal} 
                  
                  handlerRemoveAccount={handlerRemoveAccount}
                  handlerAccountSelectedForm={handlerAccountSelectedForm}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
