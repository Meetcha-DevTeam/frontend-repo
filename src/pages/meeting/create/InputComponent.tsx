import React from "react";
import styles from "./InputComponent.module.scss";

const InputComponent = () => {
  return (
    <div className={styles.inputComponent}>
      <textarea className={styles.inputComponent__inputArea} />
    </div>
  );
};

export default InputComponent;
