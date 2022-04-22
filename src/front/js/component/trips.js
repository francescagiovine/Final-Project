import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import plusUrl from "../../img/plus.png";
import {Context} from "../store/appContext";
import CardTrip from "./cardTrip";


export default function Trips() {
  const [trips, setTrips] = useState([""]);
  const token = sessionStorage.getItem("token");
  const {store, actions} = useContext(Context)

  const ListTrips = () => {
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
  };

  useEffect(() => {
    console.log(process.env.BACKEND_URL);
    ListTrips();
  }, []);

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
          return <CardTrip key={index.toString()} trip={value} />;
        })}
      </table>
     
    </div>
  );
}
