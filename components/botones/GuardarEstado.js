import React from "react";

async function updateItem(data) {
  console.log(data);

  await fetch(`${process.env.NEXT_PUBLIC_HOST}/order/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function GuardarEstado({ itemToUpdate }) {
  return (
    <button
      type="button"
      className="boton botonguardar"
      onClick={() => updateItem(itemToUpdate)}
    >
      Guardar Estado
    </button>
  );
}

export default GuardarEstado;
