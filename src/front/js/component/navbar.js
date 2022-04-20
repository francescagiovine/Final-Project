import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
//import { useContext } from "react/cjs/react.production.min"; o/home en el link a widetravel

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("token");
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="buttons">
          WideTravel
        </Link>
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
              <div>
                <Link to="/login">
                  <button className="login btn btn-primary">Login</button>
                </Link>
                <Link to="/signup" className="signup btn btn-secundary">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/private">
                  <button className="login btn btn-success">
                    <i className="fas fa-home"></i>
                  </button>
                </Link>
                <Link to="/">
                  <button
                    onClick={() => actions.logout()}
                    className="login btn btn-primary"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
