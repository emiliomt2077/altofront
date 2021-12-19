import { useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";
import { userNavbar } from "../datos/index";
import Link from "next/link";

const Navbar = () => {
  const { user } = useContext(DataContext);

  const navLinks = () => {
    switch (user.data.type) {
      case "ADMIN":
        return (
          <ul className="navlinks">
            <li>
              <Link href="/user/create">
                <a>Crear usuario</a>
              </Link>
            </li>
            <li>
              <Link href="/user">
                <a>Lista usuarios</a>
              </Link>
            </li>
            <li>
              <Link href="/clothe/create">
                <a>Crear ropa</a>
              </Link>
            </li>
            <li>
              <Link href="/clothe">
                <a>Lista ropa</a>
              </Link>
            </li>
          </ul>
        );
      case "COORD":
        return (
          <ul className="navlinks">
            <li>
              <Link href="/order">
                <a>Lista pedidos</a>
              </Link>
            </li>
            <li>
              <Link href="/birthday">
                <a>Cumpleaños</a>
              </Link>
            </li>
          </ul>
        );
      case "ASE":
        return (
          <ul className="navlinks">
            <li>
              <Link href="/order/list">
                <a>Lista pedidos</a>
              </Link>
            </li>
            <li>
              <Link href="/order/create">
                <a>Nuevo pedido</a>
              </Link>
            </li>
            <li>
              <Link href="/birthday">
                <a>Cumpleaños</a>
              </Link>
            </li>
          </ul>
        );
      default:
        return (
          <ul className="navlinks">
            <li>
              <Link href="/Clothe/all">
                <a>Nuestros productos</a>
              </Link>
            </li>
          </ul>
        );
    }
  };

  if (user)
    if (user.data.id) {
      return (
        <div className="navbar">
          <h2 className="logo">AT</h2>
          <div>{navLinks()}</div>
          <div className="navbarinfo">
            <Link href="/">
              <a>
                <h3>Info Perfil</h3>
              </a>
            </Link>
            {userNavbar.inputs.map((input, key) => {
              return <p key={key}>{user.data[input.name]}</p>;
            })}
          </div>
        </div>
      );
    }

  return (
    <div className="navbar">
      <h2 className="logo">AT</h2>

      <div className="navbarsinlogin">
        <ul className="navlinks">
          <li>
            <Link href="/clothe/all">
              <a>Productos</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
