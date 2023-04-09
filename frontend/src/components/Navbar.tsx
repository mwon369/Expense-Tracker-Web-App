import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Expense Tracker</h1>
        </Link>
        <Link to="/stats/">
          <h1>My Finance Stats</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
