import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import CardTravel from "../component/cardTravel";
import { Context } from "../store/appContext";
import widetravel from "../../img/widetravel.png";
import roadtrip from "../../img/roadtrip.png";


export const Private = () => {
  const { store, actions } = useContext(Context);
  const forms = [""];
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const [travels, setTravels] = useState([""]);

  function ListTravels() {
    console.log("entrando a ListTravels");
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
  }

  
  useEffect(() => {
    console.log(process.env.BACKEND_URL);
    ListTravels();
  }, []);

  function generateTimelineUrl() {
    return `https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=${
      process.env.BACKEND_URL
    }/api/timeline-travel/${sessionStorage.getItem(
      "id"
    )}&font=Default&lang=en&initial_zoom=1&height=500`;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="ml-auto App2 form rounded">
            {!store.token ? (
              <div>
                <h1 className="corporative">You're not logged yet</h1>
                <Link to="/login">
                  <button className="login btn btn-primary">Login</button>
                </Link>
                <Link to="/signup">
                  {" "}
                  <button className="signup btn btn-secundary">Sign Up</button>
                </Link>
              </div>
            ) : (
              <div className="App">
                {" "}
                <h1 className="corporative">
                  Welcome {name}, here you can see everything about your
                  travels.
                </h1>
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
            )}
          </div>
        </div>
        <Link to="/create-travel">
                    <button className="btn1 btn btn-secundary btn-user px-3">
                      <i className="fas fa-plus"></i>
                    </button>
                  </Link>
      </div>

      <div className="row App pt-2 pb-2 rounded">
        <div className="col">
          <div className="row mx-auto">
            <span className="h1 title">My Travels</span>
            <table className="table table-striped mt-2 border">
              <thead>
                <tr>
                <td className=""><th scope="col">Name</th></td>
                  <td className="image"><th scope="col">Image</th></td>
                  <td className="information"><th scope="col">Information</th></td>
                  <td className=""><th scope="col">Actions</th></td>
                </tr>
              </thead>
              {travels.map((value, index) => {
                return (
                  <CardTravel
                    key={index.toString()}
                    travel={value}
                    onTravelsChange={ListTravels}
                  />
                );
              })}
            </table>
          </div>
    </div>

  </div>
    </div>
  );
};
