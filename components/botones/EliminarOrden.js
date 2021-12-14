import React from "react";

function EliminarOrden(objdata) {
  const { objkey } = objdata;
  const { data } = objdata;

  return (
    <button
      type="button"
      onClick={() => {
        // products[item.reference] = item;
        // quantities[item.reference] = cantidad;
        console.log("eliminado");

        delete data.products[objkey];
        delete data.quantities[objkey];
      }}
    >
      Eliminar
    </button>
  );
}

export default EliminarOrden;
