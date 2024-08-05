import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Login = ({ authenticate, newUserLogin }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    newUserLogin({ email, password });
  };
  return (
    <form
      className="d-flex flex-column justify-content-center align-items-center wrapper"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 style={{ fontSize: "4rem" }}>Login</h1>
      <br />
      <br />
      <input
        type="email"
        placeholder="email"
        style={{
          width: "300px",
          height: "40px",
          border: "none",
          borderBottom: "1px solid black",
          outline: "none",
          background: "transparent",
          color: "white",
        }}
        className="p-3 fs-5"
        ref={emailRef}
      />

      <br />
      <input
        type="password"
        placeholder="password"
        style={{
          width: "300px",
          height: "40px",
          border: "none",
          borderBottom: "1px solid black",
          outline: "none",
          background: "transparent",
          color: "white",
        }}
        className="p-3 fs-5"
        ref={passwordRef}
      />

      <button type="submit" className="btn btn-dark m-3">
        Login
      </button>
      <Link
        to={"/"}
        style={{ textDecoration: "none" }}
        className="text-black fw-bold"
        onClick={() => authenticate("signup")}
      >
        Not registered,{" "}
        <span style={{ textDecoration: "underline" }}>Register</span>
      </Link>
    </form>
  );
};

export default Login;
