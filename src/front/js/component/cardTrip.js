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

import React from "react";
import propTypes from "prop-types";

const eliminarViaje = (id) => {
  fetch(
    "https://3001-francescagiovin-finalpro-m4vz8yo8vlu.ws-eu38.gitpod.io/api/delete-trip",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  )
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
    });
};

//! Hacia arriba es la logica

//! Hacia abajo es la vista

const CardTrip = (props) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{props.trip.name}</th>
        <td>{props.trip.location}</td>
        <td>{props.trip.begin_date}</td>
        <td>{props.trip.end_date}</td>
        <td>
          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-primary">Editar</button>
            <button
              onClick={() => eliminarViaje(props.trip.id)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

CardTrip.propTypes = { trip: propTypes.any };

export default CardTrip;
