import React, { useState, useEffect, useContext } from "react";
import Actualizar from "./botones/Actualizar";
import Eliminar from "./botones/Eliminar";
import UpdateItem from "./UpdateItem";

function TableList(lists) {
  const { lista } = lists;
  const { titulos } = lists;
  const { settable } = lists;
  const { endpoint } = lists;
  const { deletename } = lists;

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
      {actualizarItem && loading == false && (
        <UpdateItem
          titulos={titulos}
          set={setLoading}
          item={itemToUpdate}
          endpoint={endpoint}
          settable={settable}
        />
      )}

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
                  <Actualizar set={setActualizarItem} item={fila} />
                  <Eliminar
                    id={fila[deletename]}
                    endpoint={endpoint}
                    set={settable}
                  />
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableList;
