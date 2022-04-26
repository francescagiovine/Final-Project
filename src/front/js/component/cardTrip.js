import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



const Trips = () => {
  const token = sessionStorage.getItem("token");
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


const eliminarViaje = (tripid) => {
  fetch(process.env.BACKEND_URL + "/api/delete-trip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: tripid,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      Trips()
    });
};

const editarViaje = (id) => {
  fetch(process.env.BACKEND_URL + "/api/edit-trip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      location: location,
      begin_date: begin_date,
      end_date: end_date,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
    });
};

//! Hacia arriba es la logica

//! Hacia abajo es la vista

const CardTrip = (props) => {
  const link = "/edit-trip/".concat(props.trip.id);
  const CategoryName = []
  return (
    <tbody>
      <tr>
        <th scope="row">{props.trip.name}</th>

        <td>
          <div className="d-grid gap-2 d-md-block">
            <Link to={link}>
              <button className="btn btn-success">Edit</button>
            </Link>
            <button
              onClick={() => eliminarViaje(props.trip.id)}
              className="btn btn-danger">
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

CardTrip.propTypes = { trip: propTypes.any };

export default CardTrip;
