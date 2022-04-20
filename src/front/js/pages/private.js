import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import CardTrip from "../component/cardTrip";
import { Context } from "../store/appContext";
import CreateTrip from "../component/createTrip2";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [trips, setTrips] = useState([]);
  const forms = [""];
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
  }, [store.token]);

  const listTrips = () => {
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
    listTrips();
  }, []);

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
          <div className="App">
            {" "}
            <h1>
              Welcome {store.message}, this is your private area, here you can
              save all information about your trip.
            </h1>
            <iframe
              src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1VFxI2H7Ifc7e7o0m-S6_pu3k87UKCI9pvimiPMvuckU&font=Default&lang=en&initial_zoom=1&height=300"
              width="100%"
              height="300"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
              frameborder="0"
            ></iframe>
            <h2>My Activities</h2>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Activities</th>
                  <th scope="col">Location</th>
                  <th scope="col">Begin Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              {forms.map((value, index) => {
                return <CreateTrip key={index.toString()} trip={value} />;
              })}
              {trips.map((value, index) => {
                return <CardTrip key={index.toString()} trip={value} />;
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
