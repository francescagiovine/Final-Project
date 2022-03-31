import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loged, setLoged] = useState(false);
	const [missingField, setMissingField] = useState(false);
	const [missingToken, setMissingToken] = useState(false)
  
	// Handling the email change
	const handleEmail = (e) => {
	  setEmail(e.target.value);
	  setLoged(false);
	};
  
	// Handling the password change
	const handlePassword = (e) => {
	  setPassword(e.target.value);
	  setLoged(false);
	};
  
	// Handling the form submission
	const handleLogin = (e) => {
	  e.preventDefault();
	  if (email === "" || password === "") {
		setMissingField("Please enter all the fields");
	  } else { 
		  //if(token === undefined) {
			  //setMissingToken("no token here");
		  //} else
		fetch(
			process.env.BACKEND_URL + "/api/login",
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
		  .then(
			  response => response.json()
		  )
		  .then((response) => {
			  setLoged(true);
			  setMissingField(false);
			console.log(response)
			//sessionStorage.setItem("token", response.token)

		  })
		  .catch(data => { //mejorar esto
			setError(data.message);
		  });
	  }
	};
  
	// Showing success message
			//here we redirect the user to the Private Area
			//history.push("/private");
	const successMessage = () => {
	  return (
		<div
		  className="success"
		  style={{
			display: loged ? "" : "none",
		  }}
		>
		  <h1>User Loged</h1>
		  <Link to="/private">
          <button className="login">LOG IN</button>
        </Link>
		</div>
	  );
	};
  
	// Showing error message if error is true
	const MessageMisingField = () => {
	  return (
		<div
		  className="error"
		  style={{
			display: missingField != false ? "" : "none",
		  }}
		>
		  <h1>{missingField}</h1>
		</div>
	  );
	};
  
	return (


		<div className="App form">
			<div className="messages">
		  		{MessageMisingField()}
		  		{successMessage()}
			</div>
			<div>
		  		<h1>Login</h1>

					  <div>
						<form>
							<label className="label">Email</label>
							<input onChange={handleEmail} className="input" value={email} type="email"/>
							<label className="label">Password</label>
							<input onChange={handlePassword} className="input" value={password} type="password"/>
							<button onClick={handleLogin} className="btn" type="login">Login</button>
						</form>
					  </div>
			</div>

  

	  </div>
			)
		}