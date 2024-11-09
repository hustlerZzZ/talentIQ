import React, { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="rounded-lg p-1 absolute bottom-2 flex gap-4">
      <input
        className="border-2 border-black rounded-xl py-2 px-3 w-80"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button
        className="bg-blue-600 py-2 px-8 rounded-2xl text-white font-bold"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
