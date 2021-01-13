import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import Error from "./Error";
import Tools from "../../Tools";
import axios from "axios";
axios.defaults.withCredentials = true;

const Dashboard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  Tools(props);

  useEffect(() => {
    axios.get("https://mernstack-app1.herokuapp.com/dashboard").then((res) => {
      const data = res.data;
      if (data.user) {
        setUserData(data.user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      if (data.redirect) {
        setIsLoggedIn(false);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    });
  }, [setUserData]);

  const textContent = {
    first: "you are not logged in",
    second: "Login here",
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="dashboard">
          <h1>Welcome {userData.username}</h1>
        </div>
      ) : (
        <Error title="content blocked" bg="#284b63" textContent={textContent} />
      )}
    </>
  );

  /* if (isLoggedIn) {
    return (
      <div className="dashboard">
        <h1>dashboard</h1>
      </div>
    );
  }

  return (
    <Error title="content blocked" bg="#284b63" textContent={textContent} />
  ); */
};

export default Dashboard;
