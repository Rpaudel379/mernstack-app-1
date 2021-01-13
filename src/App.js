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
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    axios.get("https://mernstack-app1.herokuapp.com").then((res) => {
      const data = res.data;
      if (data.user) {
        setUserData(data.user);
      } else {
        setUserData();
      }
    });
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
