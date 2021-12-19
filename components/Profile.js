import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { userProfile } from "../datos/index";

const Profile = () => {
  const { user } = useContext(DataContext);
  return (
    <>
      <h1>Perfil de usuario</h1>
      <br />
      <section className="userinfo">
        {userProfile.inputs.map((input, key) => {
          return (
            <>
              <div key={key} className="usertitle">
                <h3>{input.label}</h3>
              </div>
              <div key={key + 0.7}>
                {input.label == "Fecha de nacimiento" && (
                  <p>{user.data[input.name].slice(0, 10)}</p>
                )}
                {input.label != "Fecha de nacimiento" && (
                  <p>{user.data[input.name]}</p>
                )}
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default Profile;
