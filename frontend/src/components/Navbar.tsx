import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  type Pages = ALL_PAGES.HOME | ALL_PAGES.SUMMARY;
  const enum ALL_PAGES {
    HOME = "HOME",
    SUMMARY = "SUMMARY",
  }

  const [currentPage, setCurrentPage] = useState<Pages>(ALL_PAGES.HOME);

  const { logout } = useLogout();
  const handleClick = () => {
    setCurrentPage(ALL_PAGES.HOME);
    logout();
  };

  const { state: authState } = useAuthContext();

  return (
    <header>
      <nav className="container">
        <div className="app-links">
          {authState.user && (
            <div>
              <Link
                onClick={() => setCurrentPage(ALL_PAGES.HOME)}
                className={
                  currentPage === ALL_PAGES.HOME ? "selected-link" : ""
                }
                to="/"
              >
                <h1>Home</h1>
              </Link>
              <Link
                onClick={() => setCurrentPage(ALL_PAGES.SUMMARY)}
                className={
                  currentPage === ALL_PAGES.SUMMARY ? "selected-link" : ""
                }
                to="/summary"
              >
                <h1>Summary</h1>
              </Link>
            </div>
          )}
          {!authState.user && (
            <div>
              <h1>Expense &nbsp;Tracker</h1>
            </div>
          )}
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
