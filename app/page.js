"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import "./globals.css";
import Form from "./ui/Form/Form";
import Loading from "./ui/Loading/Loading";

export default function Home() {
  const inputRef = useRef();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

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
        if (message) {
          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            body,
            { headers: headers }
          );

          const chatReply = response.data.choices[0].message.content;
          setReply(chatReply);

          setMessages((prevMessages) => [
            ...prevMessages,
            { msg: message, rpl: chatReply },
          ]);
        }
      } catch (err) {
        console.error(err);
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
    <>
      <div className="chat-container">
        { reply
          ? messages.map((m, index) => (
              <>
                <div className="message" key={index}>
                  <span>{m.msg}</span>
                </div>
                <div className="reply" key={index}>
                  <span>{m.rpl}</span>
                </div>
              </>
            ))
          : message && <Loading />}
      </div>
      <div className="form-container">
        {/* Pass the handleValue function and inputRef to the Form component */}
        <Form handleValue={handleValue} inputRef={inputRef} />
      </div>
    </>
  );
}
