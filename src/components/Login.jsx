import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.scss";
import axios from "../api/axios";
import useDataContext from "../hooks/useDataContext";
import headerToken from "../helpers/headerToken";
import { authLogin, fetchChannels } from "../api/fetch";

function Login() {
  const { getChannels } = useDataContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    getChannels([]);
    localStorage.clear();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const [user, header] = await authLogin(data);
    if (user === 401) {
      setHasError(true);
      setErrorMessage(header);
    } else {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token", JSON.stringify(header));
      localStorage.setItem("Channels", JSON.stringify(await fetchChannels()));
      getChannels(JSON.parse(localStorage.getItem("Channels")));
      setLoggedIn(true);
      clearInputs();
      navigate("/userpage");
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
