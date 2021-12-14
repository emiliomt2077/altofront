import React from "react";

function ocultar(setView) {
  const { set } = setView;
  set(false);
}

function Cancelar(setView) {
  return (
    <button
      type="button"
      className="boton botoncancelar"
      onClick={() => ocultar(setView)}
    >
      Cancelar
    </button>
  );
}

export default Cancelar;
