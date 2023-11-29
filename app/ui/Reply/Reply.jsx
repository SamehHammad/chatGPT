import React from "react";
import styles from "./reply.module.css";
const Reply = ({ reply }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.Message}>{reply}</h1>
    </div>
  );
};

export default Reply;
