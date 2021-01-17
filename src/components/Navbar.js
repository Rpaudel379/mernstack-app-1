import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";
//import axios from "axios";
const Navbar = () => {
  const { userData } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = useState(false);

  // logout function
  const handleLogout = (e) => {
    if (e.target.textContent === "logout") {
      e.preventDefault();
      cookie.remove("jwt");
      setLoggedOut(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  const loggedIn = [
    {
      id: 1,
      link: "/dashboard",
      text: "dashboard",
    },
    {
      id: 2,
      link: "/",
      text: "logout",
    },
  ];
  const notLoggedIn = [
    {
      id: 1,
      link: "/",
      text: "home",
    },
    {
      id: 2,
      link: "/login",
      text: "login",
    },
    {
      id: 3,
      link: "/signup",
      text: "register",
    },
  ];

  /* styles */
  const [bars, setBars] = useState(false);

  const mobileMenu = (e) => {
    setBars(!bars);
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
          <h1>anishSite</h1>
        </Link>
        <div className="header">
          <div className="bars" onClick={mobileMenu}>
            {!bars ? <FaBars /> : <FaTimes />}
          </div>
          <ul className={`nav-links ${bars && "mobile-links"}`}>
            {
              userData ? (
                <>
                  <li>
                    <Link
                      to="/"
                      className="navbar-username"
                      onClick={(e) => e.preventDefault()}
                    >
                      {userData.username}
                    </Link>
                  </li>
                  {loggedIn.map((links) => {
                    return (
                      <li key={links.id}>
                        <Link
                          to={links.link}
                          onClick={(e) => {
                            handleLogout(e);
                            setBars(false);
                          }}
                        >
                          {links.text}
                        </Link>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  {notLoggedIn.map((links) => {
                    return (
                      <li key={links.id}>
                        <Link to={links.link} onClick={() => setBars(false)}>
                          {links.text}
                        </Link>
                      </li>
                    );
                  })}
                </>
              )
              //s
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

/*  <li className="navbar-username">{userData.username}</li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>*/

export default Navbar;
