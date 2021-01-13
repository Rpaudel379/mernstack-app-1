import React, { useState, useContext } from "react";
import Tools from "../../Tools";
import UserContext from "../../context/UserContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const Login = (props) => {
  Tools(props); // title and background color

  const { userData } = useContext(UserContext);

  const [userErrors, setUserErrors] = useState();
  const [logged, setLogged] = useState(false);

  //? handlesubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      axios
        .post("https://mernstack-app1.herokuapp.com/login", {
          username,
          email,
          password,
        })
        .then((res) => {
          const data = res.data;
          // if error in login in
          if (data.errors) {
            setUserErrors(data.errors);
          } else {
            setUserErrors();
          }

          //if logged in successfully
          if (data.user) {
            //setUserData(data.user);
            setLogged(true);
            setTimeout(() => {
              // history.push("/");
              window.location.href = "/dashboard";
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      {logged && (
        <div className="model">
          <div className="model-content">
            Logged In successfuly. now redirecting to dashboard.
          </div>
        </div>
      )}

      <h1 className="page-title">Login page</h1>

      <div className="form-container">
        {userData ? (
          <p className="user-exists">Please logout first</p>
        ) : (
          <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-error">
                {userErrors && userErrors.username}
              </div>

              <div className="input">
                <input type="text" name="username" required />
                <label>username</label>
              </div>
              <div className="form-error">{userErrors && userErrors.email}</div>
              <div className="input">
                <input type="text" name="email" required />
                <label>email</label>
              </div>
              <div className="form-error">
                {userErrors && userErrors.password}
              </div>
              <div className="input">
                <input type="password" name="password" required />
                <label>password</label>
              </div>
              <div className="input">
                <button className="signup-button">Login</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
