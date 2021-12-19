import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import TableList from "../../components/Table";
import { clotheDatos } from "../../datos";

export async function getList() {
  return fetch(`${process.env.NEXT_PUBLIC_HOST}/clothe/all`).then((data) =>
    data.json().then({ data })
  );
}

function ClotheAll() {
  const { user } = useContext(DataContext);

  //const [recargarTabla, setRecargarTabla] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList().then((data) => {
      setList(data);
    });
  }, [setList]);

  return (
    <div className="principalcrud">
      <TableList lista={list} titulos={clotheDatos} tipo="Ropa" crud="" />
    </div>
  );
}

export default ClotheAll;
