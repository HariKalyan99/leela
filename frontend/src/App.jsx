import { useEffect, useState } from "react";
import Authentication from "./components/Authentication";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {

  const navigate = useNavigate();
  const [auth, setAuth] = useState("");
  const [authSignup, setAuthSignup] = useState("");
  const [authLogin, setAuthLogin] = useState("");

  // useEffect(() => {
  //   const userSignup = async(user) => {
  //     try {
  //       const {data} = await axios.post(`http://127.0.0.1:8081/auth/signup`, {
  //         ...user
  //       })
  //       console.log(data)
  //       setAuth("login")
  //       navigate("/login")
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if(authSignup?.username?.length > 1){
  //     userSignup(authSignup)
  //   }
  // }, [authSignup]);

  // useEffect(() => {
  //   const userLogin = async(user) => {
  //     try {
  //       const {data} = await axios.post(`http://127.0.0.1:8081/auth/login`, {
  //         ...user
  //       });
        
  //       setAuth("dashboard")
  //       navigate("/dashboard")
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if(authLogin?.username?.length > 1){
  //     userLogin(authLogin);
  //   }
  // }, [authLogin])

  const newUserSignup = (user) => {
    setAuthSignup(user)
  };

  const newUserLogin = (user) => {
    setAuthLogin(user);
  };
  
  const authenticate = (val) => {
    setAuth(val);
  };


  return (
    <div>
      {
        auth === "dashboard" ? <Dashboard authenticate={authenticate} auth={auth} /> : <div className="d-flex justify-content-center align-items-center"><Authentication
        auth={auth}
        authenticate={authenticate}
        newUserSignup={newUserSignup}
        newUserLogin={newUserLogin}
      /></div>
      }
      <Toaster />
    </div>
  );
}

export default App;
