import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Registration.scss";
import axios from "../api/axios";
import { authRegister } from "../api/fetch";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const EMAIL_REG = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PASS_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const t1 = EMAIL_REG.test(email);
  const t2 = PASS_REG.test(password);

  useEffect(() => {
    password === confirmPassword && t1
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  }, [confirmPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!t1 || !t2) {
      return;
    }
    const data = {
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    const reg = await authRegister(data);
    if (reg) {
      setHasError(true);
      setErrorMessage(reg);
    } else {
      setRegistered(true);
      clearInputs();
    }
  };

  return (
    <section className="registration-container">
      <h1>{registered ? "Success" : "Register"}</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
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
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button disabled={email && passwordMatch ? false : true}>Submit</button>
      </form>
      <Link className="login-link" to="/login">
        Go to Log In
      </Link>
    </section>
  );
}

export default Registration;
