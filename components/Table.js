import React, { useState, useEffect, useContext } from "react";
import Actualizar from "./botones/Actualizar";
import Eliminar from "./botones/Eliminar";
import UpdateItem from "./UpdateItem";

export async function filterDescription(description, settable) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/clothe/description/${description}`
  ).then((data) => data.json().then({ data }));
  const filter = await response;
  settable(filter);
}

export async function filterPrice(price, settable) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/clothe/price/${price}`
  ).then((data) => data.json().then({ data }));

  const filter = await response;
  settable(filter);
}

function TableList(lists) {
  const { lista } = lists;
  const { titulos } = lists;
  const { settable } = lists;
  const { endpoint } = lists;
  const { deletename } = lists;
  const { crud } = lists;
  const price = 0;
  const description = "";
  const userId = 6;

  const [actualizarItem, setActualizarItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemToUpdate = JSON.parse(JSON.stringify(actualizarItem));

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [actualizarItem]);

  return (
    <>
      <h1>Tabla {lists.tipo}</h1>
      {loading && actualizarItem && <h3>cargando...</h3>}
      {actualizarItem && loading == false && crud && (
        <UpdateItem
          titulos={titulos}
          set={setLoading}
          item={itemToUpdate}
          endpoint={endpoint}
          settable={settable}
        />
      )}

      {crud ? null : (
        <div className="filtrado">
          <div>
            <h2>filtro por descripcion</h2>
            <input
              type="text"
              onChange={(event) => {
                description = event.target.value;
              }}
              required
            />
            <button
              type="button"
              className="boton botonguardar"
              onClick={() => filterDescription(description, settable)}
            >
              Filtrar
            </button>
          </div>

          <div>
            <h2>filtro por precio</h2>
            <input
              type="text"
              onChange={(event) => {
                price = event.target.value;
              }}
              required
            />
            <button
              type="button"
              className="boton botonguardar"
              onClick={() => filterPrice(price, settable)}
            >
              Filtrar
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {titulos.inputs.map((input, key) => {
              return <td key={key}>{input.label}</td>;
            })}
          </tr>
        </thead>

        {lista && (
          <tbody>
            {lista.map((fila, key) => {
              return (
                <>
                  <tr key={key}>
                    {titulos.inputs.map((input, key) => {
                      {
                        if (input.name == "birthtDay") {
                          return (
                            <td key={key}>{fila[input.name].slice(0, 10)}</td>
                          );
                        } else {
                          return fila[input.name] ? (
                            <td key={key}>{fila[input.name].toString()}</td>
                          ) : (
                            <td>null</td>
                          );
                        }
                      }
                      {
                        /* return <td key={key}>{fila[input.name].toString()}</td>; */
                      }
                    })}
                    {crud && <Actualizar set={setActualizarItem} item={fila} />}
                    {crud && (
                      <Eliminar
                        id={fila[deletename]}
                        endpoint={endpoint}
                        set={settable}
                      />
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
}

export default TableList;
