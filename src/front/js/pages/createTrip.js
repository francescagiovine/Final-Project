import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export default function CreateTrip() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [media, setMedia] = useState("");
  const token = sessionStorage.getItem("token");
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [files, setFiles] = useState(null);
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
        console.log(data);
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

  // Handling the location change
  const handleMedia = (e) => {
    setMedia(e.target.value);
    setSubmitted(false);
  };

  const handleCategory = (e) => {
    //console.log(e.target.value)
    setSelectedCategory(e.target.value);
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
      let body = new FormData();
      body.append("name", name);
      body.append("location", location);
      body.append("begin_date", begin_date);
      body.append("end_date", end_date);
      body.append("end_date", end_date);
      body.append("category_id", selectedCategory);
      body.append("media", files[0]);

      fetch(process.env.BACKEND_URL + "/api/createTrip", {
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
        <h1> {name} created successfully</h1>        
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

  return (
    <div className="App form">
      <div>
        <h1>New Activity</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          name="name"
          type="text"
        />

        <label className="label">Description</label>
        <textarea 
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
          type="datetime-local"
        />

        <label className="label">End Date</label>
        <input
          onChange={handleEndDate}
          className="input"
          value={end_date}
          type="datetime-local"
        />



        <label className="label">Category</label>
        <select onChange={handleCategory} className="input">
          <option selected disabled>
            Select an option
          </option>
          {category.map((value, index) => (
            <option key={index} value={value.id}>
              {value.name}
            </option>
          ))}
        </select>

        <label>Subir foto</label>

        <input type="file" onChange={(e) => setFiles(e.target.files)} />

        <button className="btn btn-user" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
