import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import widetravelUrl from "../../img/pngwing.com.png";
import roadtripUrl from "../../img/roadtrip.png";


import "../../styles/home.css";

const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
  <div className="row">
    <div className="col">
    <div className=" text-center mt-5">
      <h1>HAVE YOUR WHOLE TRIP IN YOUR HANDS!!!</h1>
      <p>

      </p>
    </div>
    </div>

  </div>
</div>

  );
};

export default Home;
