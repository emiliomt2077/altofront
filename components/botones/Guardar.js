import React from "react";

async function updateItem(datas) {
  const { data } = datas;
  const { endpoint } = datas;
  const { set } = datas;
  const { settable } = datas;

  await fetch(`${process.env.NEXT_PUBLIC_HOST}/${endpoint}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  set(false);
  settable(true);
}

function Guardar(datas) {
  return (
    <button
      type="button"
      className="boton botonguardar"
      onClick={() => updateItem(datas)}
    >
      Guardar
    </button>
  );
}

export default Guardar;
