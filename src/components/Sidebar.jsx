import React from "react";
import SideBarIcon from "../subcomponents/SideBarIcon";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("teammates");
    console.log("sign out");
    navigate("/signedout");
  };

  return (
    <div className="w-36 h-full bg-primary flex flex-col justify-evenly text-white">
      <div className="h-1/6 flex flex-col justify-evenly">
        <SideBarIcon name={"New Case"} icon={"NewCase"} />
      </div>
      <div className="divider"></div>
      <div className="h-2/6 flex flex-col justify-evenly">
        <SideBarIcon name={"Dashboard"} icon={"Dashboard"} />
        <SideBarIcon name={"Domain"} icon={"Domain"} />
      </div>
      <div className="h-1/6 flex flex-col justify-evenly"></div>
      <div className="divider"></div>
      <div className="h-2/6 flex flex-col justify-evenly">
        <SideBarIcon name={"Default Team Setup"} icon={"TeamSetup"} />
        <SideBarIcon name={"Sign Out"} icon={"Signout"} fn={signOut} />
      </div>
    </div>
  );
};

export default Sidebar;
