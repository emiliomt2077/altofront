import React, { useState, useEffect, useContext } from "react";
import Actualizar from "./botones/Actualizar";
import Eliminar from "./botones/Eliminar";
import VerPedidos from "./botones/VerPedidos";
import UpdateItem from "./UpdateItem";

export async function filterDate(fecha, userId, set) {
  // const date = "2021-09-15";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/order/date/${fecha}/${userId}`
  ).then((data) => data.json().then({ data }));
  const filterDate = await response;
  set(filterDate);
}

export async function filterState(estado, userId, set) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/order/state/${estado}/${userId}`
  ).then((data) => data.json().then({ data }));

  const filter = await response;
  set(filter);
}

function TableCoord(lists) {
  const { lista } = lists;
  const { titulos } = lists;
  const { set } = lists;
  const { user } = lists;
  const fecha = "";

  const estado = "";
  const userId = user.id;
  return (
    <>
      <h1> {lists.tipo}</h1>

      <div className="filtrado">
        <div>
          <h2>filtro fecha</h2>
          <input
            type="text"
            onChange={(event) => {
              fecha = event.target.value;
            }}
            required
          />
          <button
            type="button"
            className="boton botonguardar"
            onClick={() => filterDate(fecha, userId, set)}
          >
            Filtrar fecha
          </button>
        </div>

        <div>
          <h2>filtro estado</h2>
          <input
            type="text"
            onChange={(event) => {
              estado = event.target.value;
            }}
            required
          />
          <button
            type="button"
            className="boton botonguardar"
            onClick={() => filterState(estado, userId, set)}
          >
            Filtrar estado
          </button>
        </div>
      </div>

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
