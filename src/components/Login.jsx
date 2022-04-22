import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Login.scss";
import useDataContext from "../hooks/useDataContext";
import { authLogin, fetchChannels } from "../api/fetch";
import Logo from "./Logo";

function Login() {
  const { resetChannels, getChannels } = useDataContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    resetChannels();
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
      const channels = await fetchChannels();
      localStorage.setItem("Channels", JSON.stringify(channels));
      if (channels === undefined) {
        resetChannels();
      } else {
        getChannels(JSON.parse(localStorage.getItem("Channels")));
      }
      clearInputs();
      navigate("/userpage");
    }
  };

  return (
    <section className="login-container">
      <Logo />
      <h1 className="text-header">Sign in to Slack</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {hasError && <div className="error">{errorMessage}</div>}
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
        <button disabled={email && password ? false : true}>Sign In</button>
      </form>
      <span className="text-footer">New to Slack?
        <Link className="link" to="/register">Create an account</Link>
      </span>
    </section>
  );
}

export default Login;
