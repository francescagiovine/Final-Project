import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/home" className="buttons">
          WideTravel
        </Link>
        <Link to="/">
          <span className="navbar-brand">WideTravel</span>
          <button className="buttons">Nosotros</button>
          <button className="buttons">Reseñas</button>
          <button className="login">LOG IN</button>
        </Link>
      </div>
    </nav>
  );
};
