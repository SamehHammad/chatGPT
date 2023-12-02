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
        Authorization: `Bearer ${process.env.API_KEY}`,
      };

      try {
        if (message) {
          const response = await axios.post(
            `${process.env.BASE_URL}`,
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
        {messages.map((m, index) => (
          <>
            <div className="user-m" key={index}>
              <div className="message">
                <span>{m.msg}</span>
              </div>
              <div className="user">
                <Image
                  className="user-img"
                  src={"/user.png"}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div className="robot-m" key={index}>
              <div className="robot">
                <Image
                  className="robot-img"
                  src={"/robot.jpg"}
                  width={40}
                  height={40}
                />
              </div>
              <div className="reply">
                <span>{m.rpl}</span>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="form-container">
        <Form handleValue={handleValue} inputRef={inputRef} />
      </div>
    </>
  );
}
