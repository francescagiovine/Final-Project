import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import plusUrl from "../../img/plus.png";
import { Context } from "../store/appContext";
import ListTrips from "../component/trips.js";

export const Private = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
  }, [store.token]);

  return (
    <div>
      <div className="ml-auto">
        {!store.token ? (
          <div>
            <h1>You're not logged yet</h1>
            <Link to="/login">
              <button className="login btn btn-primary">Login</button>
            </Link>
            <Link to="/signup">
              {" "}
              <button className="signup btn btn-secundary">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div>
            {" "}
            <h1>
              Bienvenido a tu área privada, aquí podrás guardar toda la
              información que tengas de tu viaje
            </h1>
            <div className="container-fluid">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                  <div className="card">
                    <button className="plusbutton">
                      <Link to="/create-trip"> Create new trip</Link>
                      <img src={plusUrl} className="card-img-top" alt="..." />
                    </button>
                    <button className="plusbutton">
                      <Link to="/trips">My trips</Link>
                      <img src={plusUrl} className="card-img-top" alt="..." />
                    </button>
                  </div>
                  {/* <ListTrips /> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
