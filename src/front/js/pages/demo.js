import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <ul className="list-group">
        {store.demo.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}
            >
              <Link to={"/single/" + index}>
                <span>Link to: {item.title}</span>
              </Link>
              {
                // Conditional render example
                // Check to see if the background is orange, if so, display the message
                item.background === "orange" ? (
                  <p style={{ color: item.initial }}>
                    Check store/flux.js scroll to the actions to see the code
                  </p>
                ) : null
              }
              <button
                className="btn btn-success"
                onClick={() => actions.changeColor(index, "orange")}
              >
                Change Color
              </button>
              <Navbar />
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
      <iframe
        src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1VFxI2H7Ifc7e7o0m-S6_pu3k87UKCI9pvimiPMvuckU&font=Default&lang=en&initial_zoom=2&height=650"
        width="100%"
        height="650"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        frameborder="0"
      ></iframe>
    </div>
  );
};
