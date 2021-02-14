import React from "react";
import { Link } from "react-router-dom";
import AuthNav from "../../components/auth-nav.js";

const NavBar = () => {

  return (
    <ul>
      <li>
        <Link className="home_link" style={{ textDecoration: 'none' }} to="/">Home</Link>
        <AuthNav />
      </li>
    </ul>
  );
}

export default NavBar;