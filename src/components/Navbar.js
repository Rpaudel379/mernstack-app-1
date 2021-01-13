import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const { userData } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = useState(false);

  // logout function
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post("https://mernstack-app1.herokuapp.com/logout").then((res) => {
      const data = res.data;

      if (data.loggedOut) {
        setLoggedOut(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        setLoggedOut(false);
      }
    });
  };

  return (
    <nav className="nav">
      {loggedOut && (
        <div className="model">
          <div className="model-content">
            successfully logged out.
            <div
              style={{
                color: "green",
                fontSize: ".8em",
                textAlign: "center",
                margin: "1em auto",
              }}
            >
              redirecting to home page
            </div>
          </div>
        </div>
      )}
      <div className="nav-center">
        <Link to="/" className="logo">
          anishSite
        </Link>
        <ul className="nav-links">
          {userData ? (
            <>
              <li className="navbar-username">{userData.username}</li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>{" "}
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}

          {/* 
            <>
            <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>{" "}
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          </>
 */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
