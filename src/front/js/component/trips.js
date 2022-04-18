import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CardTrip from "./cardTrip";
import plusUrl from "../../img/plus.png";
import {Context} from "../store/appContext";


export default function Trips() {
  const [trips, setTrips] = useState([]);
  const token = sessionStorage.getItem("token");
  const {store, actions} = useContext(Context)


  const listTrips = () => {
    fetch(process.env.BACKEND_URL + "/api/getTrips", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
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
    listTrips();
  }, []);

  //! Hacia arriba es la logica del front --> REACT

  //! Aqui empieza la vista --> Lenguaje HTML / CSS HACIA ABAJO

  return (
    <div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card">
                  <button className="plusbutton">
                    <Link to="/create-trip"> New trip</Link>
                    <img src={plusUrl} className="card-img-top" alt="..." />
                  </button>
                </div>
              </div>
            </div>
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
