import React, { useState, useEffect } from "react";
import "../../styles/home.css";

export default function CreateTrip() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [category, setCategory] = useState([]);
  //   OJO FALTA EL USER ID QUE MARCOS ME DIJO LO COLOCARA MANUAL
  const token = sessionStorage.getItem("token");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  //   EN PRINCIPIO NO NECESITAMOS NINGUN ERROR EN TEMA REGISTRO VIAJE

  const getCategory = () => {
    fetch(process.env.BACKEND_URL + "/api/getCategories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCategory(data);
        // this.setState({ totalReactPackages: data.total })
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

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

  const handleCategory = (e) => {
    setCategory(e.target.value);
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
      fetch(process.env.BACKEND_URL + "/api/createTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: name,
          location: location,
          begin_date: begin_date,
          end_date: end_date,
          latitude: "1",
          longitude: "2",
          category_id: "1",
          user_id: "1",
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setSubmitted(true);
          setError(false);
        })
        .catch((error) => {
          // setError(error);
          // console.log(error);
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
          type="date"
        />

        <label className="label">End Date</label>
        <input
          onChange={handleEndDate}
          className="input"
          value={end_date}
          type="date"
        />
        <label className="label">Category</label>
        {/* {category.map((value, index) => {
          return { value };
        })} */}
        <select defaultValue={"DEFAULT"}>
          {category.map((value, index) => (
            <option key={index} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
