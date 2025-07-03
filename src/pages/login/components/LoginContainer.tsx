import React from "react";
import Meetcha_banner from "../../../components/common/Meetcha_banner";
import Continue_Google from "./Continue_Google";
import Continue_des from "./Continue_des";

import "./login.scss";


const LoginContainer = () => {
  return (
    <div className="login_container">
      <Meetcha_banner />
      <Continue_Google />
      <Continue_des />
    </div>
  );
};

export default LoginContainer;
