import Login from "../components/Login";
import Profile from "../components/Profile";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../components/DataContext";

export default function Home() {
  const { user } = useContext(DataContext);

  if (user)
    if (user.data.id) {
      return <main className="homeuser">{user && <Profile />}</main>;
    }

  return (
    <main className="homelogin">
      <Login />
    </main>
  );
}
