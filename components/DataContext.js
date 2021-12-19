// import React from "react";

// export const DataContext = React.createContext();

import React, { createContext, useState } from "react";

// Exportamos la instancia del objecto Context
export const DataContext = createContext();

// Creamos un componente Provider el cual recibe como props los children
const Provider = ({ children }) => {
  //En este ejercicio vamos a crear una props darkMode y a su vez la vamos a guardar en el Local Storage ;)
  const [user, setUser] = useState(() => {
    const val = window.localStorage.getItem("user");

    //La razon de este if es porque cuando obtenemos datos del LS, este viene desde un JSON lo cual se parsea como un String
    //Pero para mi caso lo quiero como un boolean
    if (val === "true") return true;
    else return false;
  });

  //Value es el objeto con los valores y sus respectivas funciones de alteracion de los mismos
  // Piensa que aqui van a estar todas las props que quieres compartir y las funciones para cambiar sus valores
  const value = {
    user,
    activateUser: (value) => {
      setUser(value);
      window.localStorage.setItem("user", value);
    },
  };
  //Finalmente retornamos el componente Context.Provider y la pasamos como props el value (recuerda, son las props globales que queremos en nuestra app)
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Exportamos by defult nuestro componente Provider, pues lo vamos a usar para proveer nuestro Context en la app
export default Provider;
