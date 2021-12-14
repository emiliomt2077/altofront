import React, { useState, useEffect, useContext } from "react";
import Anadir from "./botones/Anadir";
import EliminarOrden from "./botones/EliminarOrden";
import { DataContext } from "./DataContext";

const dataOrder = {
  id: null,
  registerDay: null,
  status: "Pendiente",
  salesMan: null,
  products: {},
  quantities: {},
};

function TableOrder(lists) {
  // const { user } = useContext(DataContext);
  const { lista } = lists;
  const { titulos } = lists;

  // dataOrder.salesMan = user.data;

  const [click, setClick] = useState(false);
  const [onview, setOnview] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setClick(false);
    }, 80);
  }, [click]);

  return (
    <>
      <h1>Tabla {lists.tipo}</h1>
      <br />
      <h2>Referencias</h2>
      <table>
        <thead>
          <tr>
            {titulos.inputs.map((input, key) => {
              return <td key={key}>{input.label}</td>;
            })}
          </tr>
        </thead>

        <tbody>
          {lista.map((fila, key) => {
            return (
              <>
                <tr key={key}>
                  {titulos.inputs.map((input, key) => {
                    return <td key={key}>{fila[input.name].toString()}</td>;
                  })}
                  <Anadir
                    item={fila}
                    products={dataOrder.products}
                    quantities={dataOrder.quantities}
                    set={setClick}
                    view={setOnview}
                  />
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      {onview && (
        <div>
          <h2>lista de pedido</h2>
          <table>
            <thead>
              <tr>
                <td>Referencia</td>
                <td>Categoria</td>
                <td>Talla</td>
                <td>Disp.</td>
                <td>Cantidad disp.</td>
                <td>Cantidad pedida</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(dataOrder.products).map((fila, key) => {
                return (
                  <tr key={key}>
                    <td>{dataOrder.products[fila].reference}</td>
                    <td>{dataOrder.products[fila].category}</td>
                    <td>{dataOrder.products[fila].size}</td>
                    <td>{dataOrder.products[fila].availability.toString()}</td>
                    <td>{dataOrder.products[fila].quantity}</td>
                    <td>{dataOrder.quantities[fila]}</td>
                    <EliminarOrden objkey={fila} data={dataOrder} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TableOrder;
