import React from "react";
import { useState } from "react/cjs/react.development";
import Cancelar from "./botones/Cancelar";
import Guardar from "./botones/Guardar";

function UpdateItem(items) {
  const [view, setView] = useState(true);

  const { item } = items;
  const { titulos } = items;
  const { endpoint } = items;
  const { settable } = items;

  const itemToUpdate = JSON.parse(JSON.stringify(item.item));

  if (view) {
    return (
      <div>
        <h3>Actualizar</h3>

        <form className="updateform">
          {titulos.inputs.map((input, key) => {
            return (
              <div key={key} className="form-input">
                <label>{input.label}</label>
                <input
                  name={input.name}
                  type={input.type}
                  defaultValue={itemToUpdate[input.name]}
                  onChange={(event) => {
                    itemToUpdate[input.name] = event.target.value;
                  }}
                  required
                />
                {/* <p className="errors">{errors[input.name]?.message}</p> */}
              </div>
            );
          })}
          {/* <div className="buttonLine">
          <button type="submit">Crear</button>
        </div> */}

          <Guardar
            data={itemToUpdate}
            endpoint={endpoint}
            set={setView}
            settable={settable}
          />

          <Cancelar set={setView} />
        </form>
      </div>
    );
  }

  return null;
}

export default UpdateItem;
