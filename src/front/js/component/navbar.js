import React from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.production.min";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/home" className="buttons">
          WideTravel
        </Link>
        <div>
          {!store.token ? (
            <Link to="/login" className="buttons">
              <button className="login">LOG IN</button>
            </Link>
          ) : (
            <Link to="/login" className="buttons">
              <button onClick={() => actions.logout()} className="login">
                LOG OUT
              </button>
            </Link>
          )}
        </div>
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
