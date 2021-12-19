import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import { useForm } from "react-hook-form";
import { clotheDatos } from "../../datos";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { ClotheMessage } from "../../components/Messages";

let schemaClothe = yup.object().shape({
  reference: yup.string().required(),
  category: yup.string().required(),
  size: yup.string().required(),
  description: yup.string().required(),
  availability: yup.boolean().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
  photography: yup.string().required(),
});

function Create() {
  const { user } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaClothe),
  });

  const [getResult, setGetResult] = useState("true");

  async function onSubmit(newItem) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/clothe/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const userData = "";

    try {
      userData = await response.json();
    } catch (err) {
      userData = "fallido";
    }
    const result = { data: userData };
    setGetResult(result);
  }

  if (user)
    if ((user.data.type = "ADMIN")) {
      return (
        <main>
          <h1>Crear Ropa</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="createform">
              {clotheDatos.inputs.map((input, key) => {
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

                    {input.name == "availability" && (
                      <datalist id={input.name + key}>
                        <option value="true">Disponible</option>
                        <option value="false">No Disp</option>
                      </datalist>
                    )}

                    {input.name == "size" && (
                      <datalist id={input.name + key}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
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
          {getResult == "true" ? null : <ClotheMessage sendData={getResult} />}
        </main>
      );
    }
  return null;
}

export default Create;
