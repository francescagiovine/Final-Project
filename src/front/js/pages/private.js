import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import CardTrip from "../component/cardTrip";
import { Context } from "../store/appContext";
import plusUrl from "../../img/plus.png";
import widetravel from "../../img/widetravel.png";
import roadtrip from "../../img/roadtrip.png";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [trips, setTrips] = useState([]);
  const forms = [""];
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
      //actions.timeline();
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
              Welcome {name}, here you can see all information about your trip.
            </h1>
            <iframe
              src={`https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=https://3001-francescagiovin-finalpro-k48xhblu4u0.ws-eu42.gitpod.io/api/timeline/${sessionStorage.getItem("id")}&font=Default&lang=en&initial_zoom=1&height=500`}
              width="80%"
              height="800"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
              frameborder="0"
            ></iframe>
            <h2>My Activities</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 col ">
              <div className=" flex">
                <div className="card ">
                  <button className="plusbutton">
                    <Link to="/create-trip">New activity</Link>
                    <img src={roadtrip} className="card-img-top" alt="..." />
                  </button>
                </div>
                <div className="card ">
                  <button className="plusbutton">
                    <Link to="/trips">My trip</Link>
                    <img src={widetravel} className="card-img-top" alt="..." />
                  </button>
                </div>
                {/* <ListTrips /> */}
              </div>
            </div>
          </div>
        )}
      </div>
  );
};
