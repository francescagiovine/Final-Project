import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import moment from "moment";

const Travels = () => {
  const token = sessionStorage.getItem("token");
  fetch(process.env.BACKEND_URL + "/api/getTravels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("listTravels", data);
      setTravels(data);
      //this.setState({ totalReactPackages: data.total })
    });
};

const deleteTravel = (travelid, listTravels) => {
  fetch(process.env.BACKEND_URL + "/api/delete-travel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: travelid,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      listTravels();
    });
};

const editTravel = (id) => {
  fetch(process.env.BACKEND_URL + "/api/edit-travel", {
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


const CardTravel = (props) => {
  const link = "/edit-travel/".concat(props.travel.id);
  return (
    <tbody>
      <tr>
        <th scope="row "><h5 className="title cardname">{props.travel.name}</h5></th>
        <td className="image ">
          <img className="rounded border border-bottom" height="100" src={props.travel.media}></img>
        </td>
        <td className="information">
          <b>Description: </b> {props.travel.location} <br></br>
          <b> Start date: </b>
          {moment(props.travel.begin_date).format("DD/MM/YYYY hh:mm")} <br></br>
          <b> End date: </b>
          {moment(props.travel.end_date).format("DD/MM/YYYY hh:mm")} <br></br>
          <b> Category: </b> {props.travel.category} <br></br>
        </td>

        <td>
          <div className="d-grid gap-2 d-md-block ">
            <Link to={link} className="btn-actions me-2">
              <i className="fas fa-edit"></i>
            </Link>
            <Link
              className="btn-actions"
              onClick={() => deleteTravel(props.travel.id, props.onTravelsChange)}
            >
              <i className="fas fa-trash"></i>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

CardTravel.propTypes = { travel: propTypes.any };

export default CardTravel;
