// import React from "react";

// const cardTrip = (props) => {
//   return (
//     <div className="card w-25">
//       <div className="card-body">
//         <h5 className="card-title">{props.title}</h5>
//         <p className="card-text">{props.content}</p>
//         <a href={props.href} target="_blank" className="btn btn-primary">
//           {props.button}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default cardTrip;

// ESTO DE MOMENTO CREO QUE NO LO USARE!!!!!!

import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const eliminarViaje = (id, actualizarViajes) => {
  fetch(process.env.BACKEND_URL + "/api/delete-trip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      actualizarViajes();
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
  const CategoryName = [];
  return (
    <tbody>
      <tr>
        <th scope="row">{props.trip.name}</th>
        <td>
          <img width="100" src={props.trip.media}></img>
        </td>
        <td>
          <b>Location: </b> {props.trip.location} <br></br>
          <b> Start date: </b> {props.trip.begin_date} <br></br>
          <b> End date: </b>
          {props.trip.end_date} <br></br>
          <b> Category: </b> {props.trip.category} <br></br>
        </td>

        <td>
          <div className="d-grid gap-2 d-md-block">
            <Link to={link}>
              <button className="btn btn-success">Edit</button>
            </Link>
            <button
              onClick={() => eliminarViaje(props.trip.id, props.onTripsChange)}
              className="btn btn-danger"
            >
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
