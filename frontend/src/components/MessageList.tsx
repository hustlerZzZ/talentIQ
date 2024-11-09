// src/components/MessageList.tsx
import React from "react";
import { MessageProps } from "../utils/interfaces/message";

interface MessageListProps {
  messages: MessageProps[];
  senderId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, senderId }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${
            senderId === "user123" ? "sent" : "received"
          }`}
        >
          <div className="message-content">{msg.content}</div>
          <div className="message-timestamp">
            {msg.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
