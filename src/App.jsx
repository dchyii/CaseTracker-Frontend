import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Topbar from "./components/Topbar";
import Signin from "./components/Signin";
import SigninTest from "./components/SigninTest";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const API_ENTRY = import.meta.env.VITE_API_ENTRY;

  // useEffect(() => {
  //   const fetch = async () => {
  //     const header = {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     };
  //     const fetchedData = await axios.get(`${API_ENTRY}/api/cases/`, {
  //       header,
  //     });
  //     console.log(fetchedData);
  //   };
  //   fetch();
  // }, []);

  if (!isSignedIn) {
    return (
      <div className="App w-screen h-screen overflow-hidden">
        <Topbar />
        <div className="w-full h-full pt-10 overflow-hidden">
          <Signin state={[isSignedIn, setIsSignedIn]} />
        </div>
      </div>
    );
  }

  return (
    <div className="App w-screen h-screen overflow-hidden">
      <Topbar />
      <div className="w-full h-full pt-10 overflow-hidden">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
