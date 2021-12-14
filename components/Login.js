import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
//import LoginMessage from "../components/loginMessage";

let schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [getResult, setGetResult] = useState(null);
  const { user, setUser } = useContext(DataContext);

  async function onSubmit(newUser) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/user/${newUser.email}/${newUser.password}`
    );
    const userData = await response.json();
    const result = { data: userData };
    console.log(result);
    setGetResult(result);
    setUser(result);
  }

  return (
    <section className="login">
      <h1>Inicio de sesion</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-input">
          <label>Email</label>
          <input name="email" type="email" {...register("email")} />
          <p className="errors">{errors.email?.message}</p>
        </div>

        <div className="form-input">
          <label>Contraseña</label>
          <input name="password" type="password" {...register("password")} />
          <p className="errors">{errors.password?.message}</p>
        </div>

        <div className="buttonLine">
          <button className="ingresar" type="submit">
            Ingresar
          </button>
        </div>
      </form>
      {/* <LoginMessage sendData={getResult} /> */}
    </section>
  );
}

export default Login;
