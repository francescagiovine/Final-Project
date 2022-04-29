import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import moment from "moment";

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

const eliminarViaje = (tripid, listTrips) => {
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
      listTrips();
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


const CardTrip = (props) => {
  const link = "/edit-trip/".concat(props.trip.id);
  const CategoryName = [];
  return (
    <tbody>
      <tr>
        <th scope="row "><h5 className="title cardname">{props.trip.name}</h5></th>
        <td className="image ">
          <img className="rounded border border-bottom" height="100" src={props.trip.media}></img>
        </td>
        <td className="information">
          <b>Description: </b> {props.trip.location} <br></br>
          <b> Start date: </b>
          {moment(props.trip.begin_date).format("DD/MM/YYYY hh:mm")} <br></br>
          <b> End date: </b>
          {moment(props.trip.end_date).format("DD/MM/YYYY hh:mm")} <br></br>
          <b> Category: </b> {props.trip.category} <br></br>
        </td>

        <td>
          <div className="d-grid gap-2 d-md-block ">
            <Link to={link} className="btn-actions me-2">
              <i className="fas fa-edit"></i>
            </Link>
            <Link
              className="btn-actions"
              onClick={() => eliminarViaje(props.trip.id, props.onTripsChange)}
            >
              <i className="fas fa-trash"></i>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

CardTrip.propTypes = { trip: propTypes.any };

export default CardTrip;
