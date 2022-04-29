import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import CardTrip from "../component/cardTrip";
import { Context } from "../store/appContext";
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

  function generateTimelineUrl() {
    return `https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=${
      process.env.BACKEND_URL
    }/api/timeline/${sessionStorage.getItem(
      "id"
    )}&font=Default&lang=en&initial_zoom=1&height=500`;
  }

  return (
    <div className="container">
  <div className="row">
    <div className="col">
    <div className="ml-auto">
      {!store.token ? (
        <div>
          <h1 className="corporative">You're not logged yet</h1>
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
          <h1 className="corporative">
            Welcome {name}, here you can see everything about your travels.
          </h1>
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
      )}
    </div>
    </div>
  </div>
</div>

  );
};
