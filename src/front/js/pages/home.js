import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import widetravelUrl from "../../img/pngwing.com.png";
import roadtripUrl from "../../img/roadtrip.png";
import { Link } from "react-router-dom";


import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
  <div className="row">
    <div className="col col-6">
    <div className=" text-center">
      <h1 className="title-homepage">HAVE YOUR WHOLE TRIP IN YOUR HANDS</h1>
      <p></p>
      <p className="text-homepage">WideTravel helps you to organize all the activities and stays of your trips in a simple and easy to understand way. Discover the facilities of WideTravel for free.

      <br></br>
      <br></br>
      <br></br>
      <Link to="/signup" className="btn btn-user">Register now</Link>
      </p>
    </div>
    </div>
    <div className="col girl"></div>

  </div>
</div>

  );
};

export default Home;
