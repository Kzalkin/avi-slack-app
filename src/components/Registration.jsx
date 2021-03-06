import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Registration.scss";
import { authRegister } from "../api/fetch";
import Logo from "./Logo";
import Modal from "../helpers/Modal";
import Success from "./Success";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const EMAIL_REG = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PASS_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const t1 = EMAIL_REG.test(email);
  const t2 = PASS_REG.test(password);

  useEffect(() => {
    password === confirmPassword && t1 && t2 && password !== ""
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  }, [confirmPassword, password, email]);

  const setModal = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    setErrorMessage("");
  }, [email, confirmPassword]);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
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
      setErrorMessage(reg);
    } else {
      setModal();
      clearInputs();
    }
  };

  return (
    <section className="registration-container">
      <Logo />
      <h1 className="text-header">Create an account</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="error">{errorMessage}</div>
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
            setErrorMessage(
              "Password must 8 characters long with at least both upper and lowercase letter and a number"
            );
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
      <span className="text-footer">
        Already have an account?
        <Link className="login-link" to="/login">
          Sign in
        </Link>
      </span>
      <Modal open={openModal}>
        <Success/>
      </Modal>
    </section>
  );
}

export default Registration;
