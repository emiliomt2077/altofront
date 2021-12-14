import React, { useEffect } from "react";

function EliminarOrden(objdata) {
  const { objkey } = objdata;
  const { data } = objdata;
  const { set } = objdata;

  return (
    <button
      className="boton botoneliminar"
      type="button"
      onClick={() => {
        set(true);
        delete data.products[objkey];
        delete data.quantities[objkey];
      }}
    >
      Eliminar
    </button>
  );
}

export default EliminarOrden;
