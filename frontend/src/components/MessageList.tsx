// src/components/MessageList.tsx
import React from "react";
import { MessageProps } from "../utils/interfaces/message";

interface MessageListProps {
  messages: MessageProps[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex">
      {messages.map((msg) => (
        <div key={msg.id} className="message">
          <strong>{msg.sender}:</strong> {msg.content}
          <span className="timestamp">
            {msg.timestamp.toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
