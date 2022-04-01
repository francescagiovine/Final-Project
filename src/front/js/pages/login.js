import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loged, setLoged] = useState(false);
	const [missingField, setMissingField] = useState(false);
	const history = useHistory();
  
	// Handling the email change
	const handleEmail = (e) => {
	  setEmail(e.target.value);
	};
  
	// Handling the password change
	const handlePassword = (e) => {
	  setPassword(e.target.value);
	};
  
	// Handling the login form
	const handleLogin = (e) => {
	  e.preventDefault();
	  if (email === "" || password === "") {
		setMissingField("Please enter all the fields");
	  } else { 
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

				//console.log(response);
				//sessionStorage.setItem("token", response.token)
		//setLoged(true)
		  .then(
			  response => {
				  if(response.status != 200) 
				  	throw alert ("usuario o contraseña inválidos");				  
				return response.json(); //puedo cambiar la alerta por una funcion que suelte un html y así homogeneizar las alertas
			}) 
		  .then(responseFromApi => {
			// Do stuff with the JSONified response
			 sessionStorage.setItem("token", responseFromApi.token),
			 console.log("from a galaxy far, far away...", responseFromApi);
			 })

		  //here we redirect the user to the Private Area		 
		  .catch(error => {	console.log("ups! there is some error", error)});
	  }
	};
  
			//console.log(response)
			//sessionStorage.setItem("token", response.token)
			//history.push("/private"); o window.location("/private")

  
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
	  </div>)}