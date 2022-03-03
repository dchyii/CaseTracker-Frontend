import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Dashboard from "./pages/Dashboard";

function App() {
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

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Dashboard />
    </div>
  );
}

export default App;
