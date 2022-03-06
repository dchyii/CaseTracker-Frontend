import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Topbar from "./components/Topbar";
import Signin from "./components/Signin";
import { Routes, Route, useLocation } from "react-router-dom";
import Domain from "./pages/Domain";
import Case from "./pages/Case";
import NewCase from "./pages/NewCase";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState();
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

  // const routeParams = useLocation().pathname;
  // console.log(routeParams);
  // if (!isSignedIn && routeParams !== "/signup") {
  //   return (
  //     <div className="App w-screen h-screen overflow-hidden">
  //       <Topbar />
  //       <div className="w-full h-full pt-10 overflow-hidden">
  //         <Signin state={[isSignedIn, setIsSignedIn]} user={[user, setUser]} />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="App w-screen h-screen overflow-hidden">
      <Topbar />
      <div className="w-full h-full pt-10 overflow-hidden">
        <Routes>
          <Route path="/" element={<PrivateRoute />} exact>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases/new" element={<NewCase />} />
            <Route path="/cases/:caseID" element={<Case />} />
            <Route path="/:domain" element={<Domain />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
