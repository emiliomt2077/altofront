import React from "react";

function Actualizar(items) {
  const { set } = items;
  const { item } = items;
  return (
    <button
      type="button"
      className="boton actualizar"
      onClick={() => set({ item })}
    >
      Actualizar
    </button>
  );
}

export default Actualizar;
