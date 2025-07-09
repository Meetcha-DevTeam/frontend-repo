import React from "react";
import styles from "./TextInputComponent.module.scss";

const TextInputComponent = () => {
  return (
    <div className={styles.inputComponent}>
      <textarea className={styles.inputComponent__inputArea} />
    </div>
  );
};

export default TextInputComponent;
