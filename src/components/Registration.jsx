import React, { useState, useEffect } from "react";
import "../assets/styles/Registration.scss";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [registered, setRegistered] = useState(false)

  const EMAIL_REG = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const PASS_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const t1 = EMAIL_REG.test(email)
  const t2 = PASS_REG.test(password)

  useEffect(()=>{
    password === confirmPassword && t1? setPasswordMatch(true) : setPasswordMatch(false);
  },[confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!t1 || !t2) {
        return
    } else {
        setRegistered(true)
    }
  }

  return (
    <section className="registration-container">
      <h1>{registered?'Success':'Register'}</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
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
        <button disabled={email && passwordMatch? false : true}>Submit</button>
      </form>
    </section>
  );
}

export default Registration;
