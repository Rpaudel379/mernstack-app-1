import React from "react";
import Tools from "../../Tools";
const Home = (props) => {
  Tools(props);
  return (
    <div className="home">
      <h1 className="page-title">
        Welcome to MERN stack app. This is homepage.
      </h1>
    </div>
  );
};

export default Home;
