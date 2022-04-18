import React, { useEffect, useState } from "react";
import CardTrip from "./cardTrip";

export default function Trips() {
  const [trips, setTrips] = useState([]);

  const listTrips = () => {
    fetch(
      "https://3001-francescagiovin-finalpro-k48xhblu4u0.ws-eu40.gitpod.io/api/getTrips"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrips(data);
        //this.setState({ totalReactPackages: data.total })
      });
  };

  useEffect(() => {
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
