import React from "react";
import { Link } from "react-router-dom";
import plusUrl from "../../img/plus.png";

export const Private = () => {
  return (
    <div>
      {" "}
      <h1>
        Bienvenido a tu área privada, aquí podrás guardar toda la información
        que tengas de tu viaje
      </h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card">
            <button className="plusbutton">
              Create new trip
              <img src={plusUrl} className="card-img-top" alt="..." />
            </button>
          </div>
          <div className="card">
            <button className="plusbutton">
              Create new trip
              <img src={plusUrl} className="card-img-top" alt="..." />
            </button>
          </div>
          <div className="card">
            <button className="plusbutton">
              Create new trip
              <img src={plusUrl} className="card-img-top" alt="..." />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
