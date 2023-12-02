"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./globals.css";
import Form from "./ui/Form/Form";
import Loading from "./ui/Loading/Loading";
import Image from "next/image";

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
        Authorization: `${process.env.API_KEY}`,
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
console.log(process.env);
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
        {reply
          ? messages.map((m, index) => (
              <>
              <div className="message" key={index}>
                <Image className="user" src={"/user.png"}/>
                  <span>{m.msg}</span>
                </div>
                <div className="reply" key={index}>
                <Image className="user" src={"/robot.jpg"} />
                  <span>{m.rpl}</span>
                </div>
              </>
            ))
          : message && <Loading />}
      </div>
      <div className="form-container">
        <Form handleValue={handleValue} inputRef={inputRef} />
      </div>
    </>
  );
}
