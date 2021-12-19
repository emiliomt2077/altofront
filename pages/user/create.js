import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import { useForm } from "react-hook-form";
import { userDatos } from "../../datos";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { UserMessage } from "../../components/Messages";

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

let schema = yup.object().shape({
  identification: yup.string().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  cellPhone: yup.number().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
  birthtDay: yup.string().required(),
  monthBirthtDay: yup.number().required(),
  // passwordConfirmation: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
  zone: yup.string().required(),
  type: yup.string().required(),
});

function Create() {
  const { user } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [getResult, setGetResult] = useState("true");
  console.log(getResult);

  async function onSubmit(newUser) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/user/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newUser.identification,
        identification: newUser.identification,
        name: newUser.name,
        address: newUser.address,
        cellPhone: newUser.cellPhone,
        email: newUser.email,
        password: newUser.password,
        zone: newUser.zone,
        type: newUser.type,
        birthtDay: newUser.birthtDay,
        monthBirthtDay: newUser.monthBirthtDay,
      }),
    });
    const userData = await response.json();
    const result = { data: userData };
    setGetResult(result);
  }

  if (user)
    if ((user.data.type = "ADMIN")) {
      return (
        <main>
          <h1>Crear cuenta</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className=" createform">
              {userDatos.inputs.map((input, key) => {
                return (
                  <div key={key} className="form-input">
                    <label>{input.label}</label>
                    <input
                      list={input.name + key}
                      id={input.name}
                      name={input.name}
                      type={input.type}
                      {...register(`${input.name}`)}
                    />
                    {input.name == "monthBirthtDay" && (
                      <datalist id={input.name + key}>
                        {mesesNumero.map((mess, key) => {
                          return (
                            <option value={mess} key={key}>
                              {mess}
                            </option>
                          );
                        })}
                      </datalist>
                    )}

                    {input.name == "type" && (
                      <datalist id={input.name + key}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="COORD">COORD</option>
                        <option value="ASE">ASE</option>
                      </datalist>
                    )}
                    <p className="errors">{errors[input.name]?.message}</p>
                  </div>
                );
              })}
            </div>
            <div className="buttonLine">
              <button className="crear" type="submit">
                Crear
              </button>
            </div>
          </form>
          {getResult == "true" ? null : <UserMessage sendData={getResult} />}
        </main>
      );
    }
  return null;
}

export default Create;
