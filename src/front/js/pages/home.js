import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import widetravelUrl from "../../img/widetravel.png";
import roadtripUrl from "../../img/roadtrip.png";


import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>HAVE ALL YOUR TRIP IN YOUR HANDS!!!</h1>
      <p>
        <img src={widetravelUrl} className="img-fluid" />
      </p>
    </div>
  );
};

export default Home;
