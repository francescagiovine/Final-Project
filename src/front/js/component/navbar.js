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
          <div className="btn-group">
            <button
              className="buttons btn-lg dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Nosotros
            </button>
            <ul className="dropdown-menu">BLABLABLABLBABLALBALBA</ul>
          </div>{" "}
        </Link>
        <Link to="/home">
          <div className="btn-group">
            <button
              className="buttons btn-lg dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Reseñas
            </button>
            <ul className="dropdown-menu">BLABMKSADFNVSKJVNSJKCSNJKSD</ul>
          </div>
        </Link>
      </div>
    </nav>
  );
};
