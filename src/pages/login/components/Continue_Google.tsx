import React from "react";

import google_logo from "../../../assets/Google.svg";

import "../styles/login.scss";

const Continue_Google = () => {
  return (
  <button className="google_button">
    <img src={google_logo} alt="google_logo"/>
    <p>Continue with Google</p>
  </button>
  );
};

export default Continue_Google;
