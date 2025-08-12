import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";




export const AccountForm = ({ idClient, accountSelected, handlerAddAccount, initialAccountForm, handlerCloseFormAccount }) => {
  const [accountForm, setAccountForm] = useState(initialAccountForm);
  const { id: clientId } = useParams();


  const { id, tipo, numeroCuenta, moneda,monto, fechaCreacion, sucursal } = accountForm;

  useEffect(() => {
    setAccountForm({
      ...accountSelected
    });
  }, [accountSelected]);

  const onInputChange = ({ target }) => {
    //console.log(target.value);
    const { name, value } = target;
    setAccountForm({
      ...accountForm,
      [name]: value,
    });
  };

  const accountData = {
      ...accountForm,
      cliente: { id: parseInt(idClient, 10) } // Incluir el ID del cliente
    };

    
  const onSubmit = (e) => {
    e.preventDefault();

    if(!tipo || !numeroCuenta || !moneda || !fechaCreacion || !sucursal) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor complete todos los campos",
      });
      return;
    }

    // Agregar el clientId antes de guardar
    
    
    afterSave();
    setAccountForm(initialAccountForm);
    
  };
  
  // funcion que se ejecute luego de guardar o actualizar
  const afterSave = () => {
    console.log("Datos de la cuenta:", accountData);
    handlerAddAccount(accountData);
    console.log("Luego de la cuenta:", accountData);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="px-4">
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo
          </label>
          <select
            className="form-select"
            name="tipo"
            value={tipo}
            onChange={onInputChange}
          >
            <option value="">Seleccione un tipo</option>
            <option value="CAJA_AHORRO">Caja Ahorro</option>
            <option value="CUENTA_CORRIENTE">Cuenta Corriente</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="numeroCuenta" className="form-label">
            Número de Cuenta
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el número de cuenta"
            name="numeroCuenta"
            value={numeroCuenta}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="moneda" className="form-label">
            Moneda
          </label>
          <select
            className="form-select"
            name="moneda"
            value={moneda}
            onChange={onInputChange}
          >
            <option value="">Seleccione una moneda</option>
            <option value="BOLIVIANO">Bolivianos</option>
            <option value="DOLAR">Dólares</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="monto" className="form-label">
            Monto
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingrese el monto"
            name="monto"
            value={monto}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaCreacion" className="form-label">
            Fecha de Creación
          </label>
          <input
            type="date"
            className="form-control"
            value={fechaCreacion}
            name="fechaCreacion"
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sucursal" className="form-label">
            Sucursal
          </label>
          <select
            className="form-select"
            name="sucursal"
            value={sucursal}
            onChange={onInputChange}
          >
            <option value="">Seleccione una sucursal</option>
            <option value="LA_PAZ">La Paz</option>
            <option value="COCHABAMBA">Cochabamba</option>
            <option value="SANTA_CRUZ">Santa Cruz</option>
          </select>
        </div>

        <input type="hidden" name="id" value={id} />

        <div className="modal-footer">
          <button className="btn btn-outline-secondary px-5" onClick={handlerCloseFormAccount}>
            Cerrar
          </button>
          <button type="submit" className="btn btn-primary px-5">
            {id > 0 ? "Actualizar" : "Guardar"}
          </button>
          
        </div>
      </form>
    </>
  );
};
