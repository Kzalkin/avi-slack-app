import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.scss";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] =useState('')
  const navigate = useNavigate();

  const SIGN_IN_URL = "/auth/sign_in";

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setErrorMessage('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        SIGN_IN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: {"Content-Type": "application/json"}
        }
      );
      console.log(resp.data);
      setLoggedIn(true);
      clearInputs();
      navigate("/userpage");
    } catch (error) {
      setHasError(true)
      setErrorMessage(error.response.data.errors)
    }
  };

  return (
    <section className="login-container">
      <h1>{loggedIn ? "Logged In" : "Log in"}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
      {hasError && <div>{errorMessage}</div>}
        <input
          className="input"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button disabled={email && password ? false : true}>Log In</button>
      </form>
    </section>
  );
}

export default Login;
