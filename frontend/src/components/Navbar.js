import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <ul className="nav-bar">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
  </ul>
);

export default Navbar;
