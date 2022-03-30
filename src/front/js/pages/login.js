import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";



export const Login = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loged, setLoged] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();
	

	const handleClick = () => {
		actions.login(email, password).then(() => {
			history.push("/private")
		})
	}
  
  
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
		setError("Please enter all the fields");
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
		  .then(
			  response => response.json()
		  )
		  .then((response) => {
			  setLoged(true);
			  setError(false);
			//here we redirect the user to the Private Area
			history.push("/private");
			//console.log(response)
			sessionStorage.setItem("token", response.token)

		  })
		  .catch(data => { //mejorar esto
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
			display: loged ? "" : "none",
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
			<div className="messages">
		  		{errorMessage()}
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
	 
	