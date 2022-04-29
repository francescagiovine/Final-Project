import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
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

  function generateTimelineUrl() {
    return `https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=${
      process.env.BACKEND_URL
    }/api/timeline/${sessionStorage.getItem(
      "id"
    )}&font=Default&lang=en&initial_zoom=1&height=500`;
  }

  //! Hacia arriba es la logica del front --> REACT

  //! Aqui empieza la vista --> Lenguaje HTML / CSS HACIA ABAJO

  return (
    <div className="container">
  <div className="row App pt-2 pb-2 rounded">
    <div className="col">
      <div className="row col-12 mx-auto">
        <iframe
          src={generateTimelineUrl()}
          width="100%"
          height="500"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          frameborder="0"
        ></iframe>
      </div>

      <div className="row mx-auto">
        <span className="h1 title">My Trips</span>
        <table className="table table-striped mt-2 border">
          <thead>
            <tr>
            <td className=""><th scope="col">Name</th></td>
              <td className="image"><th scope="col">Image</th></td>
              <td className="information"><th scope="col">Information</th></td>
              <td className=""><th scope="col">Actions</th></td>
            </tr>
          </thead>
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

    </div>

  </div>
</div>

  );
}
