import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {Context} from "../store/appContext";

export const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const {store, actions} = useContext(Context)
  
	// Handling the email change
	const handleEmail = (e) => {setEmail(e.target.value)};
  
	// Handling the password change
	const handlePassword = (e) => {setPassword(e.target.value);};
  
	// Handling the login form
	const handleLogin = (e) => {
		e.preventDefault();
				if (email === "" || password === "") {
				  alert("Please enter all the fields");
				} else { 
					actions.login(email, password)
			//here we redirect the user to the Private Area: history.push("/private"); o window.location("/private")
		}};

	if(store.token && store.token != "" && store.token != undefined) history.push("/private");

  
	return (
	
		<div className="container">
  <div className="row">
    <div className="col">
	<div className="App form pt-2 pb-2 rounded">
			<div>
		  		<h1 className="title">Login</h1>

					  <div>
						<form>
							<label className="label">Email</label>
							<input onChange={handleEmail} className="input" value={email} type="email"/>
							<label className="label">Password</label>
							<input onChange={handlePassword} className="input" value={password} type="password"/>
							<button onClick={handleLogin} className="btn btn-login" type="login">Login</button>
						</form>
					  </div>
			</div>
	  </div>
    </div>
  </div>
</div>

)
	}