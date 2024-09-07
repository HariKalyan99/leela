import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ authenticate, newUserSignup }) => {
  const usernameRef = useRef("");
  const fullnameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate()

  const {mutate, isError, isPending, error} = useMutation({
    mutationFn: async({ username, fullname, email, password }) => {
      try {
        const res = await fetch('/api/auth/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username, fullname, email, password
          })
        })
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Failed to create account");
        authenticate("login");
        navigate("/login")
      } catch (error) { 
        console.error(error);
        throw error
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    } 
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    mutate({ username, fullname, email, password })
    // newUserSignup({ username, fullname, email, password });
  };

  return (
    <form
      className="d-flex flex-column justify-content-center align-items-center wrapper"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 style={{ fontSize: "4rem", color:"white" }}>Signup</h1>
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
        className="p-3 fs-3"
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
        className="p-3 fs-3"
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
        className="p-3 fs-3"
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
        className="p-3 fs-3"
        ref={passwordRef}
      />

      <button type="submit" className="btn btn-dark m-3">
        {isPending ? "Loading..." : "Signup"}
      </button>
      
      {isError && <p className="text-danger">{error.message}</p>}
      <Link
        to={"/login"}
        style={{ textDecoration: "none" }}
        className="text-black fw-bold"
        onClick={() => authenticate("login")}
      >
        Already registered,{" "}
        <span style={{ textDecoration: "underline" }}>Login</span>
      </Link>
    </form>
  );
};

export default Signup;
