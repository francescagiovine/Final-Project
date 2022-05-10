import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import CardActivity from "./cardActivity";

export default function Activities() {
  const [activities, setActivities] = useState([""]);
  const token = sessionStorage.getItem("token");
  const travel = sessionStorage.getItem("travel")
  const { store, actions } = useContext(Context);

  function ListActivities() {
    console.log("receiving list of activities");
    fetch(process.env.BACKEND_URL + "/api/getActivitiesByTravel/" + travel, {
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
      });
  }

  useEffect(() => {
    console.log(process.env.BACKEND_URL);
    ListActivities();
  }, []);

  function generateTimelineUrl() {
    return `https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=${
      process.env.BACKEND_URL
    }/api/timeline-activity/${sessionStorage.getItem(
      "id"
    )}&font=Default&lang=en&initial_zoom=1&height=500`;
  }

  return (
    <div className="container">
  <div className="row App pt-2 pb-2 rounded">
    <div className="col">
      <div className="row col-12">
        <div className="row">
          <div className="col-5">
            <Link to="/private" className="text-decoration-none">
              <button className="btn1 btn btn-secundary btn-user">
                <h3><i className="fas fa-angle-double-left"></i> Back to Travels</h3>
              </button>
            </Link>
          </div>
          <div className="col-2"></div>
          <div className="col-5">
            <Link to="/create-activity" className="text-decoration-none">
              <button className="btn1 btn btn-secundary btn-user">
                <h3><i className="fas fa-plus"></i> New Activity</h3>
              </button>
            </Link>
          </div>
        </div>
        <iframe
          src={generateTimelineUrl()}
          width="100%"
          height="500"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          frameborder="0"
        ></iframe>
      </div>

      <div className="row mx-auto">
        <span className="h1 title">My Activities</span>
        <table className="table table-striped mt-2 border">
          <thead>
            <tr>
            <td className=""><th scope="col">Name</th></td>
              <td className="image"><th scope="col">Image</th></td>
              <td className="information"><th scope="col">Information</th></td>
              <td className=""><th scope="col">Actions</th></td>
            </tr>
          </thead>
          {activities.map((value, index) => {
            return (
              <CardActivity
                key={index.toString()}
                activity={value}
                onActivitiesChange={ListActivities}
              />
            );
          })}
        </table>
          <div className="col-5 align-self-start">
          <Link to="/create-activity" className="text-decoration-none">
              <button className="btn1 btn btn-secundary btn-user px-3">
                <h3><i className="fas fa-plus"></i> New Activity</h3>
              </button>
          </Link>
        </div>
      </div>

    </div>

  </div>
</div>

  );
}
