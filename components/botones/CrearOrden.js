import React from "react";

async function updateOrder(order) {
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
  const dateMinutes = d.getTime();

  return (
    <div className="buttonLine">
      <button
        className="crear"
        type="submit"
        onClick={() => {
          order.registerDay = d.toISOString();
          order.id = dateMinutes.toString().slice(-7);
          console.log(order.id);
          console.log(dateMinutes);
          updateOrder(order);
        }}
      >
        Crear orden
      </button>
    </div>
  );
}

export default CrearOrden;
