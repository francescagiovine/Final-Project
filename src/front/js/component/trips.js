import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import plusUrl from "../../img/plus.png";
import {Context} from "../store/appContext";
import CreateTrip from "./createTrip2";


export default function Trips() {
  const [trips, setTrips] = useState([""]);
  const token = sessionStorage.getItem("token");
  const {store, actions} = useContext(Context)


  //! Hacia arriba es la logica del front --> REACT

  //! Aqui empieza la vista --> Lenguaje HTML / CSS HACIA ABAJO

  return (
    <div>
      <span className="listTrips">Mis viajes</span>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Activity</th>
            <th scope="col">Location</th>
            <th scope="col">Begin Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
          
        </thead>
        {trips.map((value, index) => {
          return <CreateTrip key={index.toString()} trip={value} />;
        })}
      </table>
     
    </div>
  );
}
