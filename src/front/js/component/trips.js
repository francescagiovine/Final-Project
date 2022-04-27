import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import plusUrl from "../../img/plus.png";
import { Context } from "../store/appContext";
import CardTrip from "./cardTrip";

export default function Trips() {
  const [trips, setTrips] = useState([""]);
  const token = sessionStorage.getItem("token");
  const { store, actions } = useContext(Context);

  function ListTrips() {
    console.log("entrando a ListTrips");
    fetch(process.env.BACKEND_URL + "/api/getTrips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("listTrips", data);
        setTrips(data);
        //this.setState({ totalReactPackages: data.total })
      });
  }

  useEffect(() => {
    console.log(process.env.BACKEND_URL);
    ListTrips();
  }, []);

  //! Hacia arriba es la logica del front --> REACT

  //! Aqui empieza la vista --> Lenguaje HTML / CSS HACIA ABAJO

  return (
    <div>
      <span className="h1">Mis viajes</span>
      <br></br>
      <br></br>
      <table className="table table-striped">
        {/* <thead>
          <tr>
            <th scope="col">Activity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead> */}
        {trips.map((value, index) => {
          return (
            <CardTrip
              key={index.toString()}
              trip={value}
              onTripsChange={ListTrips}
            />
          );
        })}
      </table>
    </div>
  );
}
