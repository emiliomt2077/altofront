import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import TableList from "../../components/Table";
import { clotheDatos } from "../../datos";

export async function getList() {
  return fetch(`${process.env.NEXT_PUBLIC_HOST}/clothe/all`).then((data) =>
    data.json().then({ data })
  );
}

function ClotheCRUD() {
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

  if (user)
    if ((user.data.type = "ADMIN")) {
      return (
        <div className="principalcrud">
          {recargarTabla && <h2>cargando...</h2>}
          {recargarTabla == false && (
            <TableList
              lista={list}
              titulos={clotheDatos}
              tipo="Ropa"
              settable={setRecargarTabla}
              endpoint="clothe"
              deletename="reference"
              crud="true"
            />
          )}
        </div>
      );
    }
  return null;
}

export default ClotheCRUD;
