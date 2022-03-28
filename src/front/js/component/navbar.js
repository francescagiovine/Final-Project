import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/home" className="buttons">
          WideTravel
        </Link>
        <Link to="/home">
          <button className="buttons">Nosotros</button>
        </Link>
        <Link to="/home">
          <button className="buttons">Reseñas</button>
        </Link>
      </div>
    </nav>
  );
};
