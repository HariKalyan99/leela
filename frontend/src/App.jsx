import { useEffect, useState } from "react";
import Authentication from "./components/Authentication";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {

  const navigate = useNavigate();
  const [auth, setAuth] = useState("");
  const [authSignup, setAuthSignup] = useState("");
  const [authLogin, setAuthLogin] = useState("");

  useEffect(() => {
    const userSignup = async(user) => {
      try {
        const {data} = await axios.post(`http://localhost:3000/users`, {
          ...user
        })
        setAuth("login")
        navigate("/login")
      } catch (error) {
        console.log(error);
      }
    }

    if(authSignup?.username?.length > 1){
      userSignup(authSignup)
    }
  }, [authSignup]);

  useEffect(() => {
    const userLogin = async(user) => {
      try {
        const {data} = await axios.get(`http://localhost:3000/users`);
        if(data.find(x => x.email === user?.email && x.password === user?.password)){
          localStorage.setItem("userToken", JSON.stringify({id: data.find(x => x.email === user?.email).id}))
          setAuth("dashboard")
          navigate("/dashboard")
        }else{
          alert("Incorrect email or password")
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(authLogin?.email?.length > 1){
      userLogin(authLogin);
    }
  }, [authLogin])

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
    </div>
  );
}

export default App;
