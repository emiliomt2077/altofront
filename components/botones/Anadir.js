import React, { useState } from "react";

function Anadir(data) {
  const { item } = data;
  const { products } = data;
  const { quantities } = data;
  const { set } = data;
  const { view } = data;

  const [cantidad, setcantidad] = useState(1);

  return (
    <>
      <input
        type="number"
        min="1"
        className="contador"
        defaultValue="1"
        onChange={(event) => {
          setcantidad(event.target.value);
        }}
      ></input>

      <button
        className="boton botonanadir"
        type="button"
        onClick={() => {
          products[item.reference] = item;
          quantities[item.reference] = cantidad;
          set(true);
          view(true);
        }}
      >
        Añadir
      </button>
    </>
  );
}

export default Anadir;
