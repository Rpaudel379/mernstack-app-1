import React, { useContext } from "react";
import Tools from "../../Tools";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
const Home = (props) => {
  Tools(props);

  const { userData } = useContext(UserContext);

  return (
    <div className="home">
      <h1 className="page-title">This is MERN stack app. Homepage.</h1>
      {userData ? (
        <>
          <h1 className="page-title">Welcome {userData.username}</h1>

          <h1 className="page-title">
            <Link to="/dashboard">goto dashboard</Link>
          </h1>
        </>
      ) : (
        <h1 className="page-title">You are currently not logged in</h1>
      )}
    </div>
  );
};

export default Home;
