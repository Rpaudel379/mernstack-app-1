import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import Error from "./Error";
import Tools from "../../Tools";
import axios from "axios";
import cookie from "js-cookie";
axios.defaults.withCredentials = true;

const Dashboard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  Tools(props);

  useEffect(() => {
    const checkAuth = async () => {
      let token = cookie.get("jwt");
      if (token) {
        try {
          const tokenRes = await axios.post(
            "http://localhost:5000/valid",
            null,
            {
              headers: { "x-auth-token": token },
            }
          );
          if (tokenRes.data) {
            console.log(tokenRes.data);
            setUserData(tokenRes.data);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    };
    checkAuth();
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
};

export default Dashboard;
