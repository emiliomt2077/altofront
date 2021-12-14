import React from "react";

export async function deleteItem(data) {
  const { id } = data;
  const { endpoint } = data;

  await fetch(`${process.env.NEXT_PUBLIC_HOST}/${endpoint}/${id}`, {
    method: "DELETE",
  });
  //const data = await response.json();
  //const result = { data: userData };
}

function Eliminar(data) {
  const { set } = data;
  return (
    <button
      className="boton eliminar"
      onClick={() => {
        deleteItem(data);
        set(true);
      }}
    >
      eliminar
    </button>
  );
}

export default Eliminar;
