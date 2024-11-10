import React, { useEffect, useRef } from "react";
import { MessageProps } from "../utils/interfaces/message";

interface MessageListProps {
  messages: MessageProps[];
  senderId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, senderId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender === senderId ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              msg.sender === senderId
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div className="text-sm font-semibold mb-1">{msg.sender}</div>
            <div className="break-words">{msg.content}</div>
            <div className="text-xs mt-1 opacity-75">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
