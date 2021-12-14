import React from "react";
import Link from "next/link";

function VerPedidos({ id }) {
  return (
    <button className="boton botonanadir">
      <Link href={`/order/${id}`}>
        <a>Ver pedido</a>
      </Link>
    </button>
  );
}

export default VerPedidos;
