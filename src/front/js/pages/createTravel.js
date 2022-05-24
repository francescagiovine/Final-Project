import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import moment from "moment";

export default function CreateTravel(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [media, setMedia] = useState("");
  const token = sessionStorage.getItem("token");
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [files, setFiles] = useState(null);
  //   EN PRINCIPIO NO NECESITAMOS NINGUN ERROR EN TEMA REGISTRO VIAJE

  const handleLocationUrl = (e) => {
    setLocationUrl(e.target.value);
    setSubmitted(false);
  };

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
  const handleMedia = (e) => {
    setMedia(e.target.value);
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
      setError("Please enter all the travel fields");
      return;
    }

    const beginDateMoment = moment(begin_date);
    const endDateMoment = moment(end_date);

    if (beginDateMoment.isAfter(endDateMoment)) {
      setError("Begin date must be before end date");
      return;
    }

    let body = new FormData();
    body.append("name", name);
    body.append("location", location);
    body.append("description", description);
    body.append("location_url", locationUrl);
    body.append("begin_date", begin_date);
    body.append("end_date", end_date);
    if (files) {
      body.append("media", files[0]);
    }

    fetch(process.env.BACKEND_URL + "/api/createTravel", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSubmitted(true);
        setError(false);
        history.push("/private");
      })
      .catch((error) => {
        // setError(error);
        // console.log(error);
      });
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
        <h3> {name} created successfully</h3>
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
        <h3>{error}</h3>
      </div>
    );
  };

  const uploadImage = (evt) => {
    evt.preventDefault();
    // we are about to send this to the backend.
    console.log("This are the files", files);
    let body = new FormData();
    body.append("profile_image", files[0]);
    const options = {
      body,
      method: "POST",
    };
    // you need to have the user_id in the localStorage
    fetch(`${process.env.BACKEND_URL}/user/${currentUserId}/image`, options)
      .then((resp) => resp.json())
      .then((data) => console.log("Success!!!!", data))
      .catch((erros) => console.error("ERRORRRRRR!!!", error));
  };

  const onMapClick = (e) => {
    console.log("passss", e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container App form pt-2 pb-2 rounded">
        <div className="row">
          <div className="col-12">
            <div>
              <h1 className="title">New Travel</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
              {errorMessage()}
              {successMessage()}
            </div>
          </div>
          <div className="col-md-6">
            <label className="label">Name</label>
            <input
              onChange={handleName}
              className="input"
              value={name}
              name="name"
              type="text"
            />

            <label className="label">Begin Date</label>
            <input
              onChange={handleBeginDate}
              className="input"
              value={begin_date}
              type="datetime-local"
            />

            <label className="label">Description</label>
            <textarea
              onChange={handleDescription}
              className="input"
              value={description}
              type="text"
            />
          </div>
          <div className="col-md-6">
            {/* <div className="App form pt-2 pb-2 rounded"> */}
            {/* Labels and inputs for form data */}

            <label className="label">Location</label>
            <input
              onChange={handleLocation}
              className="input"
              value={location}
              type="text"
            />

            <label className="label">End Date</label>
            <input
              onChange={handleEndDate}
              className="input"
              value={end_date}
              type="datetime-local"
            />

            <label className="label">URL</label>
            <input
              onChange={handleLocationUrl}
              className="input"
              value={locationUrl}
              type="text"
            />
            {/* </div> */}
          </div>
          <div className="col-12">
            <label className="label">Upload File</label>
            <input
              type="file"
              className="input"
              onChange={(e) => setFiles(e.target.files)}
            />

            <br />
            <br />

            <button className="btn btn-user" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
