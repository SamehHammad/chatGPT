"use client";
import { useEffect, useRef, useState } from "react";
import "./globals.css";
import Messages from "./ui/Messages/Messages";
import axios from "axios";
import Form from "./ui/Form/Form";
import Reply from "./ui/Reply/Reply";

export default function Home() {
  const inputRef = useRef();
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  useEffect(() => {
    const fetchMessage = async () => {
      const body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      };
      const headers = {
        Authorization:
          "Bearer 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",
      };
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",

          body,
          { headers: headers }
        );
        const reply = response.data.choices[0].message.content;
        setReply(reply);
        console.log(reply);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessage();
  }, [message]);
  const handleValue = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    setMessage(inputValue);
    inputRef.current.value = "";
  };

  return (
    <main className="main">
      <div className="container">
        <div className="message-area">
          {message && <Messages message={message} />}{" "}
        </div>
        <div className="reply">{reply && <Reply reply={reply} />} </div>
        <Form handleValue={handleValue} inputRef={inputRef} />
      </div>
    </main>
  );
}
