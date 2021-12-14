import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import TableList from "../../components/Table";
import { userDatos } from "../../datos";

export async function getList() {
  return fetch(`${process.env.NEXT_PUBLIC_HOST}/user/all`).then((data) =>
    data.json().then({ data })
  );
}

function UserCRUD() {
  const { user } = useContext(DataContext);

  const [recargarTabla, setRecargarTabla] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList().then((data) => {
      setList(data);
    });
    setTimeout(() => {
      setRecargarTabla(false);
    }, 800);
  }, [recargarTabla]);

  // if (user)
  //   if (user.data.type) {
  return (
    <div>
      {recargarTabla && <h2>cargando...</h2>}
      {recargarTabla == false && (
        <TableList
          lista={list}
          titulos={userDatos}
          tipo="usuarios"
          settable={setRecargarTabla}
          endpoint="user"
          deletename="id"
        />
      )}
    </div>
  );
  //  }
  //return null;
}

export default UserCRUD;
