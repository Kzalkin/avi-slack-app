import React, { useState } from "react";
import "../assets/styles/Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");


  const handleSubmit = (e) => {
      e.preventDefault()
      setLoggedIn(true)
  }

  return (
    <section className="login-container">
      <h1>{loggedIn? 'Logged In' : 'Log in'}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
