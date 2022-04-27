import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditTrip() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [media, setMedia] = useState("");
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
        setSelectedCategory(response.category_id);
        setMedia(response.media);
      });
  };
  useEffect(() => {
    getSingleTrip(id);
  }, []); // OJO CON ESTO USEEFFECT COMO TRIP.JS

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

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
      setError("Please enter all the fields");
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
          category_id: selectedCategory,
          media: media,
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
        <h1 className="corporative">You edited your activity to {name} successfully</h1>
        <h1 className="corporative">
          <Link to="/trips">Back to Activities</Link>
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
    <div className="App form">
      <div>
        <h1 className="corporative">Edit your trip</h1>
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

        <label className="label">Description</label>
        <textarea 
          onChange={handleLocation}
          className="input"
          defaultValue={location}
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
          onChange={handleMedia}
          className="input"
          defaultValue={media}
          type="text"
        />

        <label className="label">Category</label>
        <select onChange={handleCategory} defaultValue={selectedCategory} className="input">
          <option selected disabled>
            Select an option
          </option>
          {category.map((value, index) => (
            <option
              key={index}
              value={value.id}
              selected={
                selectedCategory && selectedCategory == value.id
                  ? "selected"
                  : ""
              }
            >
              {value.name}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit} className="btn btn-user">
          Save
        </button>
      </form>
    </div>
  );
}
