import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { clotheDatos } from "../../datos/index";
import GuardarEstado from "../../components/botones/GuardarEstado";

async function getList(id) {
  if (id) {
    return await fetch(`${process.env.NEXT_PUBLIC_HOST}/order/${id}`).then(
      (data) => data.json().then({ data })
    );
  }
}

function OrderDetails() {
  const {
    query: { id },
  } = useRouter();

  const [order, setOrder] = useState({});
  const [lista, setLista] = useState(null);

  useEffect(() => {
    if (id) {
      getList(id).then((data) => {
        setOrder(data);
        setLista(data.products);
      });
    }
  }, [id]);

  const itemToUpdate = JSON.parse(JSON.stringify(order));

  return (
    <div>
      <h1>Detalles pedido</h1>
      <br />

      <h2>Referencias</h2>
      {lista && (
        <table>
          <thead>
            <tr>
              <td>Fecha</td>
              <td># pedido</td>
              <td>Estado</td>
              <td>Cambiar</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{order.registerDay.slice(0, 10)}</td>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>
                <input
                  defaultValue={order.status}
                  onChange={(event) => {
                    itemToUpdate.status = event.target.value;
                  }}
                  required
                />
              </td>
              <GuardarEstado itemToUpdate={itemToUpdate} />
            </tr>
          </tbody>
        </table>
      )}
      {lista && (
        <table>
          <thead>
            <tr>
              {clotheDatos.inputs.map((input, key) => {
                return <td key={key}>{input.label}</td>;
              })}
              <td>Pedida</td>
            </tr>
          </thead>

          <tbody>
            {Object.keys(lista).map((fila, key) => {
              return (
                <>
                  <tr key={key}>
                    {clotheDatos.inputs.map((input, key) => {
                      return (
                        <td key={key}>{lista[fila][input.name].toString()}</td>
                      );
                    })}
                    <td>{order.quantities[fila]}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderDetails;
