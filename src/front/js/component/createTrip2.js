// import React from "react";

// const cardTrip = (props) => {
//   return (
//     <div className="card w-25">
//       <div className="card-body">
//         <h5 className="card-title">{props.title}</h5>
//         <p className="card-text">{props.content}</p>
//         <a href={props.href} target="_blank" className="btn btn-primary">
//           {props.button}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default cardTrip;

// ESTO DE MOMENTO CREO QUE NO LO USARE!!!!!!

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const CardTrip = (props) => {
  const link = "/edit-trip/".concat(props.trip.id);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const token = sessionStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  
  const CategoryName = [];

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
  
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
    setSubmitted(false);
  };

  const handleBeginDate = (e) => {
    setBeginDate(e.target.value);
    setSubmitted(false);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    setSubmitted(false);
  };

  const handleCategory = (e) => {
    //console.log(e.target.value)
    setSelectedCategory(e.target.value);
    setSubmitted(false);
  };

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
          category_id: selectedCategory,
          user_id: "1",
        }),
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
    <tbody>
      <tr>
        <th scope="row">        
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        /></th>
        <td>        
          <input
          onChange={handleLocation}
          className="input"
          value={location}
          type="text"
        /></td>
        <td>
        <input
          onChange={handleBeginDate}
          className="input"
          value={begin_date}
          type="date"
        />
        </td>
        <td>
        <input
          onChange={handleEndDate}
          className="input"
          value={end_date}
          type="date"
        />
        </td>
        <td>
        <select onChange={handleCategory}>
          <option selected disabled>
            Seleccione una opción
          </option>
          {category.map((value, index) => (
            <option key={index} value={value.id}>
              {value.name}
            </option>
          ))}
        </select>
        </td>
        <td>
          <div className="d-grid gap-2 d-md-block">
          <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};


export default CardTrip;
