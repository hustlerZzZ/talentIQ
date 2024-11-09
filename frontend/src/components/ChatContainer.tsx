import React, { useState, useEffect } from "react";
import { socket } from "../socket/chat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { MessageProps } from "../utils/interfaces/message";

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    socket.on("message", (message: MessageProps) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (content: string) => {
    const newMessage: MessageProps = {
      id: Date.now().toString(),
      sender: "You",
      content,
      timestamp: new Date(),
    };

    socket.emit("message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 pt-96 px-5 border-2 border-black">
      <MessageList messages={messages} senderId="user123"/>
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatContainer;
