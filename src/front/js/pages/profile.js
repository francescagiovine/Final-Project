import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({});
  const [saved, setSaved] = useState(null);
  const token = sessionStorage.getItem("token");

  const getUser = () => {
    fetch(process.env.BACKEND_URL + "/api/user", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("user", data);
        setUser(data);
        //this.setState({ totalReactPackages: data.total })
      });
  };

  const saveUser = () => {
    fetch(process.env.BACKEND_URL + "/api/modify/user", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setSaved(true);
          setTimeout(() => {
            setSaved(null);
          }, 2000);
        } else {
          setSaved(false);
          setTimeout(() => {
            setSaved(null);
          }, 2000);
        }
        return response.json();
      })
      .then((data) => {
        console.log("user", data);
        setUser(data);
        //this.setState({ totalReactPackages: data.total })
      });
  };

  useEffect(() => {
    console.log(process.env.BACKEND_URL);
    getUser();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <label className="col-1" htmlFor="name">
          name
        </label>
        <input
          id="name"
          className="col-4"
          name="name"
          defaultValue={user.name}
          onChange={(event) => {
            setUser({ ...user, name: event.target.value });
          }}
        />
      </div>
      <div className="row">
        <label className="col-1" htmlFor="email">
          email
        </label>
        <input
          id="email"
          className="col-4"
          name="email"
          defaultValue={user.email}
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
          }}
        />
      </div>
      <button
        onClick={() => {
          if (user.name.trim() != "" && user.email.trim() != "") {
            saveUser();
          } else {
            setSaved(false);
            setTimeout(() => {
              setSaved(null);
            }, 2000);
          }
        }}
      >
        Save
      </button>
      {saved
        ? "usuario cambiado"
        : saved == false
        ? "usuario no cambiado"
        : null}
    </div>
  );
};
