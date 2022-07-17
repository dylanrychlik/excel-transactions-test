// components/Navbar.js

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return ( 
  	<nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
      <NavLink
    className="navbar-item"
    activeClassName="is-active"
    to="/forgotPassword"
    exact
>
	Home
</NavLink>
      </div>
    </nav>
  );
 };
 
 export default Navbar;
