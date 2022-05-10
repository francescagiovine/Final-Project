import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditTravel() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [media, setMedia] = useState("");
  const token = sessionStorage.getItem("token");
  // const id = queryParams.get("id");
  // console.log(id);

  const getSingleTravel = (id) => {
    fetch(process.env.BACKEND_URL + "/api/travel/".concat(id))
      .then((response) => response.json())
      .then((response) => {
        console.log("getSingleTravel", response);
        setName(response.name);
        setLocation(response.location);
        setDescription(response.description);
        setBeginDate(response.begin_date);
        setEndDate(response.end_date);
        setLocationUrl(response.latitude);
      });
  };
  useEffect(() => {
    getSingleTravel(id);
  }, []); // OJO CON ESTO USEEFFECT COMO TRAVEL.JS

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

  // Handling the description change
  const handleDescription = (e) => {
    setDescription(e.target.value);
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

  // Handling the location change
  const handleLocationUrl = (e) => {
    setLocationUrl(e.target.value);
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
      setError("Please enter all the fields");
    } else {
      fetch(process.env.BACKEND_URL + "/api/editTravel", {
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
          latitude: locationUrl,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("editTravel");
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
        <h1 className="corporative">
          You edited your travel to {name} successfully
        </h1>
        <h1 className="corporative">
          <Link to="/travels">Back to Activities</Link>
        </h1>
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
        <h1 className="corporative">{error}</h1>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="App form pt-2 pb-2 rounded">
            <div>
              <h1 className="title">Edit your travel</h1>
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
                defaultValue={name}
                type="text"
              />

              <label className="label">Location</label>
              <input
                onChange={handleLocation}
                className="input"
                value={location}
                type="text"
              />

              <label className="label">Description</label>
              <textarea
                onChange={handleDescription}
                className="input"
                value={description}
                type="text"
              />

              <label className="label">Begin Date</label>
              <input
                defaultValue={begin_date}
                onChange={handleBeginDate}
                className="input"
                type="datetime-local"
              />

              <label className="label">End Date</label>
              <input
                type="datetime-local"
                className="input"
                onChange={handleEndDate}
                defaultValue={end_date}
              />

              <label className="label">URL</label>
              <input
                onChange={handleLocationUrl}
                className="input"
                defaultValue={locationUrl}
                type="text"
              />

              <button onClick={handleSubmit} className="btn btn-user">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}