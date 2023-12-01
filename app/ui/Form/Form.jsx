import React from "react";
import styles from "./form.module.css";
import { IoSendSharp } from "react-icons/io5";
 
const Form = ({ handleValue, inputRef }) => {
  return (
    <>
      <form onSubmit={handleValue} className={styles.form}>
        <input
          type="text"
          placeholder="chat with me"
          ref={inputRef}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
        <IoSendSharp className={styles.btn}/>
        </button>
      </form>
    </>
  );
};

export default Form;
