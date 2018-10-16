import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <ul className="nav-bar">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
    <li>
      <Link to="/">Sign Out</Link>
    </li>
    {/* <li>
      <Link to="/publicprofile">Public Profile</Link>
    </li> */}
  </ul>
);

export default Navbar;
