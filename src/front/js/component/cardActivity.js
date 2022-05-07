import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import moment from "moment";

const Activities = () => {
  const token = sessionStorage.getItem("token");
  fetch(process.env.BACKEND_URL + "/api/getActivities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("listActivities", data);
      setActivities(data);
      //this.setState({ totalReactPackages: data.total })
    });
};

const deleteActivity = (activityID, listActivities) => {
  fetch(process.env.BACKEND_URL + "/api/delete-activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: activityID,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      listActivities();
    });
};

const editActivity = (id) => {
  fetch(process.env.BACKEND_URL + "/api/edit-activity", {
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


const CardActivity = (props) => {
  const link = "/edit-activity/".concat(props.activity.id);
  const CategoryName = [];
  return (
    <tbody>
      <tr>
        <th scope="row "><h5 className="title cardname">{props.activity.name}</h5></th>
        <td className="image ">
          <img className="rounded border border-bottom" height="100" src={props.activity.media}></img>
        </td>
        <td className="information">
          <b>Description: </b> {props.activity.location} <br></br>
          <b> Start date: </b>
          {moment(props.activity.begin_date).format("DD/MM/YYYY hh:mm")} <br></br>
          <b> End date: </b>
          {moment(props.activity.end_date).format("DD/MM/YYYY hh:mm")} <br></br>
          <b> Category: </b> {props.activity.category} <br></br>
        </td>

        <td>
          <div className="d-grid gap-2 d-md-block ">
            <Link to={link} className="btn-actions me-2">
              <i className="fas fa-edit"></i>
            </Link>
            <Link
              className="btn-actions"
              onClick={() => deleteActivity(props.activity.id, props.onActivitiesChange)}
            >
              <i className="fas fa-trash"></i>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

CardActivity.propTypes = { activity: propTypes.any };

export default CardActivity;
