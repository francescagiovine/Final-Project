import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
//import { useContext } from "react/cjs/react.production.min"; o/home en el link a widetravel

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUser();
  }, [store.name]);
  console.log(store.name);

  return (
    <div className="ml-auto">
      <nav className="navbar navbar-expand-md navbar-light ml-auto flex">
        <div className="container-fluid">
          <div className="col">
            <Link to="/" className="buttons flex text-white text-decoration-none">
              <img className="logo" src={logo} />
              <h2 className="WideTravel">WideTravel</h2>
            </Link>
          </div>
          <div className="col">
            <div className="ml-auto">
              {!store.token ? (
                <div className="loginPadre"></div>
              ) : (
                <div className="col flex ">
                <Link to="/profile" className="text-decoration-none">
                  <h2 className="pe-3 name text-white">{store.name} <i className="fas fa-solid fa-user"></i></h2>
                </Link>
              </div>
              )}
            </div>
          </div>


          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div className="ml-auto h3">
                {!store.token ? (
                  <div className="loginPadre">
                    <Link  className="btn1 btn btn-secundary btn-user" to="/login">Login</Link>
                    <Link to="/signup" className="btn btn-secundary btn-user">SignUp</Link>
                  </div>
                ) : (
                  <div className="loginPadre">
                    <Link to="/private">
                      <button
                        className="btn1 btn btn-secundary btn-user"
                        title="Home"
                      >
                        <i className="fas fa-home"></i>
                      </button>
                    </Link>
                    <Link to="/">
                      <button
                        onClick={() => actions.logout()}
                        className=" btn btn-secundary btn-user"
                        title="Log Out"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
