import React, { useState, useContext } from "react";
import Tools from "../../Tools";
import UserContext from "../../context/UserContext";
import cookie from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

const Signup = (props) => {
  Tools(props); // title and background color

  const { userData } = useContext(UserContext);

  const [userErrors, setUserErrors] = useState();
  const [logged, setLogged] = useState(false);

  // ? handlesubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      axios
        .post("https://mernstack-app1.herokuapp.com/signup", {
          username,
          email,
          password,
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          if (data) {
            // setUserData({ token: data.token, user: data.user });
            cookie.set("jwt", data.token, { expires: 5 });
            setLogged(true);
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        })
        .catch((err) => {
          // if error in signing up
          err.response.data && setUserErrors(err.response.data);
        });

      /*   */
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-page">
      {logged && (
        <div className="model">
          <div className="model-content">
            Registered successfuly. now redirecting to dashboard.
          </div>
        </div>
      )}

      <h1 className="page-title">Signup page</h1>

      <div className="form-container">
        {userData ? (
          <p className="user-exists">Please logout first</p>
        ) : (
          <>
            <h1>Signup</h1>

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
                <button className="signup-button">Signup</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
