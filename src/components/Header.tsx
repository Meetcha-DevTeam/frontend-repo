import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import MainLogo from "@assets/MeetchaLogo.svg";
import LeftArrow from "@assets/leftArrow.svg?react";
import Hamburger from "@assets/hamburger2.svg";

interface Props {
  prevButton: boolean;
  hamburger: boolean;
}

const Header = ({ prevButton,hamburger }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      {prevButton && <LeftArrow className={styles.header__leftArrow} onClick={() => navigate(-1)} />}
      <img className={styles.header__mainlogo} src={MainLogo} alt="Meetcha 로고 이미지" onClick={() => navigate("/")} />
      {hamburger && <img className={styles.header__hamburger} src={Hamburger} alt="Hamburger"/>}
    </div>
  );
};

export default Header;
