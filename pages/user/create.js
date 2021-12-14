import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import { useForm } from "react-hook-form";
import { userDatos } from "../../datos";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
//import UserMessage from "../../components/userMessage";

let schema = yup.object().shape({
  identification: yup.string().required(),
  name: yup.string().required(),
  address: yup.string().required(),
  cellPhone: yup.number().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
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

  const [getResult, setGetResult] = useState(null);

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
      }),
    });
    const userData = await response.json();
    const result = { data: userData };
    console.log(result);
    setGetResult(result);
  }

  if (user)
    if (user.data.type) {
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
                      name={input.name}
                      type={input.type}
                      {...register(`${input.name}`)}
                    />
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
          {/* <UserMessage sendData={getResult} /> */}
        </main>
      );
    }
  return null;
}

export default Create;
