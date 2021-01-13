import React from "react";
import { Link } from "react-router-dom";
import Tools from "../../Tools";
const Error = (props) => {
  Tools(props);

  const { textContent } = props;

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };
  return (
    <div className="error">
      {textContent ? (
        <>
          <h1>{textContent.first}</h1>
          <Link to="/" onClick={handleClick}>
            {textContent.second}
          </Link>
        </>
      ) : (
        <>
          <h1>404 error. The page you are looking is not here</h1>

          <Link to="/">Redirect to Homepage</Link>
        </>
      )}
    </div>
  );
};

export default Error;
