import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  type Pages = "HOME" | "STATS";
  const ALL_PAGES = {
    HOME: "HOME",
    STATS: "STATS",
  };

  const [currentPage, setCurrentPage] = useState<Pages>(
    ALL_PAGES.HOME as Pages
  );

  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const { state: authState } = useAuthContext();

  return (
    <header>
      <nav className="container">
        <div className="app-links">
          <Link
            onClick={() => setCurrentPage(ALL_PAGES.HOME as Pages)}
            className={currentPage === ALL_PAGES.HOME ? "selected-link" : ""}
            to="/"
          >
            <h1>Home</h1>
          </Link>
          <Link
            onClick={() => setCurrentPage(ALL_PAGES.STATS as Pages)}
            className={currentPage === ALL_PAGES.STATS ? "selected-link" : ""}
            to="/stats"
          >
            <h1>Stats</h1>
          </Link>
        </div>
        <div className="auth-links">
          {!authState.user && (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          {authState.user && (
            <div>
              <span>{authState.user?.username}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
