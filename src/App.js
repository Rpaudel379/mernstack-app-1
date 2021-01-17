import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.scss";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup";
// context
import UserContext from "./context/UserContext";
import Dashboard from "./components/pages/Dashboard";
import cookie from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const checkCookie = async () => {
      let token = cookie.get("jwt");
      if (token) {
        try {
          const tokenRes = await axios.post(
            "https://mernstack-app1.herokuapp.com/valid",
            null,
            {
              headers: { "x-auth-token": token },
            }
          );
          if (tokenRes.data) {
            console.log(tokenRes.data);
            setUserData(tokenRes.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkCookie();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home title="Home" bg="#fff" />
            </Route>
            <Route path="/login">
              <Login title="Login" bg="#284b63" />
            </Route>
            <Route path="/signup">
              <SignUp
                title="Signup"
                bg="linear-gradient(to right, #485563, #29323c)"
              />
            </Route>
            <Route path="/dashboard">
              <Dashboard title="Dashboard" bg="#fff" />
            </Route>

            <Route path="*">
              <Error title="404 error" bg="#284b63" />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
