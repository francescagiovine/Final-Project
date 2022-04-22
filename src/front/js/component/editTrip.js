import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";

export default function EditTrip() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const token = sessionStorage.getItem("token");
  // const id = queryParams.get("id");
  // console.log(id);

  const getSingleTrip = (id) => {
    fetch(process.env.BACKEND_URL + "/api/trip/".concat(id))
      .then((response) => response.json())
      .then((response) => {
        console.log("getSingleTrip", response);
        setName(response.name);
        setLocation(response.location);
        setBeginDate(response.begin_date);
        setEndDate(response.end_date);
      });
  };
  useEffect(() => {
    getSingleTrip(id);
  }, []); // OJO CON ESTO USEEFFECT COMO TRIP.JS

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    console.log(name);
    // setSubmitted(false);
  };

  // Handling the location change
  const handleLocation = (e) => {
    setLocation(e.target.value);
    setSubmitted(false);
  };

  // Handling the beginDate change
  const handleBeginDate = (e) => {
    setBeginDate(e.target.value);
    setSubmitted(false);
  };

  // Handling the endDate change
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      location === "" ||
      begin_date === "" ||
      end_date === ""
    ) {
      setError("Please enter all the trip fields");
    } else {
      fetch(process.env.BACKEND_URL + "/api/editTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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
        .then((data) => {
          console.log("editTrip");
          setSubmitted(true);
          setError(false);
        })
        .catch((error) => {
          // setError(error);
          console.log(error);
        });
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>You edited your trip to {name} successfully</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error != false ? "" : "none",
        }}
      >
        <h1>{error}</h1>
      </div>
    );
  };

  return (
    <div className="App form">
      <div>
        <h1>Edit your trip</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          placeholder={name}
          type="text"
        />

        <label className="label">Location</label>
        <input
          onChange={handleLocation}
          className="input"
          placeholder={location}
          type="text"
        />

        <label className="label">Begin Date</label>
        <input
          type="text"
          className="input"
          onChange={(e) => console.log(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          placeholder={begin_date}
        />

        <label className="label">End Date</label>
        <input
          type="text"
          className="input"
          onChange={(e) => console.log(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          placeholder={end_date}
        />

        <button onClick={handleSubmit} className="btn">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
