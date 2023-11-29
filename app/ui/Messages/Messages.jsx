import React from "react";
import styles from "./messages.module.css";
const Messages = ({ message }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.Message}>{message}</h1>
    </div>
  );
};

export default Messages;
