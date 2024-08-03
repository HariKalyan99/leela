import { useState } from "react";
import Authentication from "./components/Authentication";

function App() {

  const [auth, setAuth] = useState(true);

  const authenticate = () => {
    setAuth(!auth)
  }
  return (
    <div className="d-flex justify-content-center align-items-center" >
      {<Authentication auth={auth} authenticate={authenticate}/>}
    </div>
  );
}

export default App;
