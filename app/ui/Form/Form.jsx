import React from "react";
import styles from "./form.module.css";

const Form = ({ handleValue, inputRef }) => {
  return (
    <>
      <form onSubmit={handleValue}>
        <input type="text" placeholder="chat with me" ref={inputRef} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Form;
