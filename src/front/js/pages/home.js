import React, { useContext } from "react";
import { Context } from "../store/appContext";
import widetravelUrl from "../../img/widetravel.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>HAVE ALL YOUR TRIP IN YOUR HANDS!!!</h1>
      <p>
        <img src={widetravelUrl} />
      </p>
      <div className="text-center2 mt-5">
        <h2>Imagina que todo fuera tan facil como volar</h2>
      </div>
    </div>
  );
};
