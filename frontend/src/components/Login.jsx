import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ authenticate, newUserLogin }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {mutate: loginFn, isPending, isError, error } = useMutation({
    mutationFn: async({username, password}) => {
      try {
        const res = await fetch(`http://127.0.0.1:8081/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username, password
          }),
          credentials: "include"
        })
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Failed Logging in");
        authenticate("dashboard");
        navigate("/dashboard")
      } catch (error) {
        throw error        
      }
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]})
      
    },
    onError: (error) => {
      toast.error(error.message)
    } 
  }) 
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = emailRef.current.value;
    const password = passwordRef.current.value;
    loginFn({ username, password });
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
        type="text"
        placeholder="username or email"
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
        {isPending ? "Loading.." : "Login"}
      </button>
      {isError && <p className="text-danger">{error.message}</p>}
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
