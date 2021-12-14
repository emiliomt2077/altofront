import React, { useState, useEffect, useContext } from "react";
import Actualizar from "./botones/Actualizar";
import Eliminar from "./botones/Eliminar";
import VerPedidos from "./botones/VerPedidos";
import UpdateItem from "./UpdateItem";

function TableCoord(lists) {
  const { lista } = lists;
  const { titulos } = lists;

  return (
    <>
      <h1> {lists.tipo}</h1>

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
            console.log(Object.keys(fila.products).length);
            return (
              <>
                <tr key={key + 0.5}>
                  <td>{fila.id}</td>
                  <td>{fila.registerDay.slice(0, 10)}</td>
                  <td>{fila.status}</td>
                  <td>{fila.salesMan.name}</td>
                  <td>{Object.keys(fila.products).length}</td>

                  <VerPedidos id={fila.id} />
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableCoord;
