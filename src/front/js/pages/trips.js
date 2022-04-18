import React, { useEffect, useState } from "react";
import CardTrip from "../component/cardTrip";

export default function Trips() {
  const [trips, setTrips] = useState([]);

  const listTrips = () => {
    fetch(process.env.BACKEND_URL + "/api/getTrips")
      .then((response) => response.json())
      .then((data) => {
        console.log("listTrips", data);
        setTrips(data);
        // this.setState({ totalReactPackages: data.total })
      });
  };

  useEffect(() => {
    console.log(process.env.BACKEND_URL);
    listTrips();
  }, []);

  //! Hacia arriba es la logica del front --> REACT

  //! Aqui empieza la vista --> Lenguaje HTML / CSS HACIA ABAJO

  return (
    <div>
      <span className="listTrips">Mis viajes</span>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Begin Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        {trips.map((value, index) => {
          return <CardTrip key={index.toString()} trip={value} />;
        })}
      </table>
    </div>
  );
}
