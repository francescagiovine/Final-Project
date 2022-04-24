import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
//import { useContext } from "react/cjs/react.production.min"; o/home en el link a widetravel

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const getUser = () => {
    fetch(process.env.BACKEND_URL + "/api/getUser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCategory(data);
        // this.setState({ totalReactPackages: data.total })
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-fluid ">
        <div className="col">
          <Link to="/" className="buttons">
            WideTravel
          </Link>
          <img className="logo" src={logo} />
        </div>
        <div className="col"></div>
        <div className="col-3 col-sm-2 flex">
      
        <h1>{name}</h1>
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
          <div className="ml-auto">
            {!store.token ? (
              <div className="loginPadre">
                <Link to="/login">
                  <button className="loginHome btn btn-primary">Login</button>
                </Link>
                <Link to="/signup" className="signup btn btn-secundary">
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="loginPadre">
                <Link to="/private">
                  <button className="iconoHome btn btn-success">
                    <i className="fas fa-home"></i>
                  </button>
                </Link>
                <Link to="/">
                  <button
                    onClick={() => actions.logout()}
                    className="loginLogOut btn btn-primary"
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
  );
};
