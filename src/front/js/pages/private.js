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
            src={`https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=https://3001-francescagiovin-finalpro-k48xhblu4u0.ws-eu42.gitpod.io/api/timeline/${sessionStorage.getItem(
              "id"
            )}&font=Default&lang=en&initial_zoom=1&height=500`}
            width="80%"
            height="500"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            frameborder="0"
          ></iframe>
          <h2>My Activities</h2>
        <div className=" flex card-group ">
          <div class="card border-secondary">
            <div class="card-header">Header</div>
            <div class="card-body text-secondary">
              <h5 class="card-title">Secondary card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>             
          </div>
          <div class="card border-secondary mb-3">
            <div class="card-header">Header</div>
            <div class="card-body text-secondary">
              <h5 class="card-title">Secondary card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>             
          </div>
        </div>
          
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
