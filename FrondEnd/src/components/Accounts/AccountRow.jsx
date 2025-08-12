export const AccountRow = ({
  handlerAccountSelectedForm,
  handlerRemoveAccount,
  id,
  tipo,
  numeroCuenta,
  moneda,
  monto,
  fechaCreacion,
  sucursal,
}) => {
  const onRemoveAccount = (id) => {
    handlerRemoveAccount(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{tipo}</td>
      <td>{numeroCuenta}</td>
      <td>{moneda}</td>
      <td>{monto}</td>
      <td>{fechaCreacion}</td>
      <td>{sucursal}</td>
      <td>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button 
            className="btn btn-info btn-sm me-2 d-flex align-items-center"
            onClick={() => handlerAccountSelectedForm({
              id,
              tipo,
              numeroCuenta,
              moneda,
              monto,
              fechaCreacion,
              sucursal
            })}
          >
            <i className="fas fa-edit mx-1"></i> Editar
          </button>
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={() => handlerRemoveAccount(id)}
          >
            <i className="fas fa-trash mx-1"></i> Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};
