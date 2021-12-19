import React from "react";

export const MessagesLogin = ({ sendData }) => {
  if (sendData != undefined || null) {
    if (sendData.data.id != null) {
      return (
        <div className="creado-exitoso">
          <p>Bienvenido {sendData.data.name}</p>
        </div>
      );
    } else if (sendData.data.id == null) {
      return (
        <div className="creado-fallido">
          <p>No existe un usuario</p>
        </div>
      );
    }
  }
  return null;
};

export const UserMessage = ({ sendData }) => {
  if (sendData.data) {
    return (
      <div className="creado-fallido">
        <p>Creado fallido</p>
      </div>
    );
  }
  return (
    <div className="creado-exitoso">
      <p>Creado exitoso</p>
    </div>
  );
};

export const ClotheMessage = ({ sendData }) => {
  if (sendData.data != "fallido") {
    return (
      <div className="creado-fallido">
        <p>Creado fallido</p>
      </div>
    );
  }
  return (
    <div className="creado-exitoso">
      <p>Creado exitoso</p>
    </div>
  );
};

function Messages() {
  return <div></div>;
}

export default Messages;
