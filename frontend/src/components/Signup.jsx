import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Signup = ({ authenticate, newUserSignup }) => {
  const usernameRef = useRef("");
  const fullnameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    newUserSignup({ username, fullname, email, password });
  };

  return (
    <form
      className="d-flex flex-column justify-content-center align-items-center wrapper"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 style={{ fontSize: "4rem" }}>Signup</h1>
      <br />
      <br />
      <input
        type="text"
        placeholder="username"
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
        ref={usernameRef}
      />

      <br />
      <input
        type="text"
        placeholder="fullname"
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
        ref={fullnameRef}
      />

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
        Signup
      </button>
      <Link
        to={"/login"}
        style={{ textDecoration: "none" }}
        className="text-black fw-bold"
        onClick={authenticate}
      >
        Already registered,{" "}
        <span style={{ textDecoration: "underline" }}>Login</span>
      </Link>
    </form>
  );
};

export default Signup;
