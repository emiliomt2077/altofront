import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import TableCoord from "../../components/TableCoord";
import { orderCoordDatos } from "../../datos";

export async function getList() {
  const zona = "ZONA 2";
  return fetch(`${process.env.NEXT_PUBLIC_HOST}/order/zona/${zona}`).then(
    (data) => data.json().then({ data })
  );
}

function OrderList() {
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
    <div className="principalcrud">
      {recargarTabla && <h2>cargando...</h2>}
      {recargarTabla == false && (
        <TableCoord lista={list} titulos={orderCoordDatos} tipo="Pedidos" />
      )}
    </div>
  );
  //  }
  //return null;
}

export default OrderList;
