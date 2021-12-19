import React, { useState, useEffect } from "react";
import TableList from "../../components/Table";
import { userBirthday } from "../../datos/index";

const mesesNombre = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const mesesNumero = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

async function getBirthday(mes, setBirthdays) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/user/birthday/${mes}`
  ).then((data) => data.json().then({ data }));
  const birthday = await response;
  setBirthdays(birthday);
}

function Birthday() {
  const d = new Date();
  let month = d.getMonth();
  let nombreMes = mesesNombre[month];
  let numeroMes = mesesNumero[month];

  const mesInput = numeroMes;

  const [mes, setMes] = useState(numeroMes);
  const [birthdays, setBirthdays] = useState([]);

  const titulo = birthdays[0]
    ? mesesNombre[birthdays[0].monthBirthtDay - 1]
    : null;

  useEffect(() => {
    getBirthday(mes, setBirthdays);
  }, [setBirthdays]);

  return (
    <main>
      <h1>Cumpleaños {titulo}</h1>
      <br />
      <table>
        <thead>
          <tr>
            {userBirthday.inputs.map((input, key) => {
              return <td key={key}>{input.label}</td>;
            })}
          </tr>
        </thead>

        <tbody>
          {birthdays.map((fila, key) => {
            return (
              <>
                <tr key={key}>
                  {userBirthday.inputs.map((input, key) => {
                    if (input.name == "birthtDay") {
                      return <td key={key}>{fila[input.name].slice(0, 10)}</td>;
                    }
                    return <td key={key}>{fila[input.name].toString()}</td>;
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <div>
        <label>Selecciona el mes:</label>
        <input
          list="mesesimp"
          name="mesimp"
          id="mesimp"
          onChange={(event) => {
            mesInput = event.target.value;
          }}
          required
        />
        <datalist id="mesesimp">
          {mesesNombre.map((mess, key) => {
            return (
              <option value={mesesNumero[key]} key={key}>
                {mess}
              </option>
            );
          })}
        </datalist>
        <button
          type="button"
          className="boton botonguardar"
          onClick={() => getBirthday(mesInput, setBirthdays)}
        >
          Ver cumpleaños
        </button>
      </div>
    </main>
  );
}

export default Birthday;
