import React from "react";

async function updateOrder(order) {
  console.log(order);
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/order/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
}

function CrearOrden(data) {
  const { order } = data;
  const d = new Date();
  return (
    <div className="buttonLine">
      <button
        className="crear"
        type="submit"
        onClick={() => {
          order.registerDay = d.toISOString();
          updateOrder(order);
        }}
      >
        Crear orden
      </button>
    </div>
  );
}

export default CrearOrden;
