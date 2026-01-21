import Meetcha_banner from "../../components/common/Meetcha_banner";
import Continue_Google from "../../components/domain/login/Continue_Google";
import Continue_des from "../../components/domain/login/Continue_des";

import "../styles/login.scss";

const LoginContainer = () => {
  return (
    <div className="login_container">
      <div className="flex_container1">
        <Meetcha_banner />
        <div className="flex_container2">
          <Continue_Google />
          <Continue_des />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
