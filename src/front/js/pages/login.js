import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();
  
  
	// Handling the email change
	const handleEmail = (e) => {
	  setEmail(e.target.value);
	  setSubmitted(false);
	};
  
	// Handling the password change
	const handlePassword = (e) => {
	  setPassword(e.target.value);
	  setSubmitted(false);
	};
  
	// Handling the form submission
	const handleSubmit = (e) => {
	  e.preventDefault();
	  if (email === "" || password === "") {
		setError("Please enter all the fields");
	  } else {
		fetch(
		  "https://3001-francescagiovin-finalpro-9pv5aq5akcb.ws-eu38.gitpod.io/api/login",
		  {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  }
		)
		  .then((response) => {
			if (response.ok) {
			  setSubmitted(true);
			  setError(false);
			//here we redirect the user to the Private Area
			history.push("/private");
			} 
			 else {
			  return response.json();
			}
		  })
		  .then((data) => {
			setError(data.message);
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
		  <h1>User {name} Successfully registered!!</h1>
		  <Link to="/private">
          <button className="login">LOG IN</button>
        </Link>
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
		  <h1>Login</h1>
		</div>
  
		{/* Calling to the methods */}
		<div className="messages">
		  {errorMessage()}
		  {successMessage()}
		</div>
  
		<form>
		  {/* Labels and inputs for form data */}
  
		  <label className="label">Email</label>
		  <input
			onChange={handleEmail}
			className="input"
			value={email}
			type="email"
		  />
  
		  <label className="label">Password</label>
		  <input
			onChange={handlePassword}
			className="input"
			value={password}
			type="password"
		  />
  
		  <button onClick={handleSubmit} className="btn" type="submit">
			Submit
		  </button>
		</form>
	  </div>
	);
  }
