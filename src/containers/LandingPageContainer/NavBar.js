import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <ul>
      <li>
        <Link className="home_link" style={{ textDecoration: 'none' }} to="/">Home</Link>
      </li>
    </ul>
  );
}

export default NavBar;