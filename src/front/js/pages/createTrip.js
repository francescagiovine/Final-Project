import React, { useState } from "react";
import "../../styles/home.css";

export default function CreateTrip() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  //   OJO FALTA EL USER ID QUE MARCOS ME DIJO LO COLOCARA MANUAL

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  //   EN PRINCIPIO NO NECESITAMOS NINGUN ERROR EN TEMA REGISTRO VIAJE

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
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
      fetch(
        "https://3001-francescagiovin-finalpro-m4vz8yo8vlu.ws-eu38.gitpod.io/api/create-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            location: location,
            begin_date: begin_date,
            end_date: end_date,
          }),
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
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
        <h1>You created your trip to {name} successfully</h1>
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
        <h1>Create your trip</h1>
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
          value={name}
          type="text"
        />

        <label className="label">Location</label>
        <input
          onChange={handleLocation}
          className="input"
          value={location}
          type="text"
        />

        <label className="label">Begin Date</label>
        <input
          onChange={handleBeginDate}
          className="input"
          value={begin_date}
          type="datetime"
        />

        <label className="label">End Date</label>
        <input
          onChange={handleEndDate}
          className="input"
          value={end_date}
          type="datetime"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
