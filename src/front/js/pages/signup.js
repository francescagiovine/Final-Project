import React, { useState } from "react";
import "../../styles/home.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

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
    if (name === "" || email === "" || password === "") {
      setError("Please enter all the fields");
    } else {
      fetch(
        process.env.BACKEND_URL + "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            setSubmitted(true);
            setError(false);
          } else {
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
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="App form pt-2 pb-2 rounded">
            <div>
              <h1 className="title">User Registration</h1>
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
          value={name}
          type="text"
        />

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
      </form>
      <button onClick={handleSubmit} className="btn btn-login" type="submit">
          Submit
        </button>
    </div>
    </div>
  </div>
</div>    
  );
}
