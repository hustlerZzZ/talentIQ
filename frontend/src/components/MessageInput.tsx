import React, { useState, KeyboardEvent } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-4">
      <input
        className="flex-1 rounded-md outline-none bg-zinc-700 text-white py-2 px-3"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        disabled={disabled}
      />
      <button
        className="bg-blue-600 py-2 px-8 rounded-md text-white font-medium disabled:bg-zinc-700"
        onClick={handleSend}
        disabled={disabled || !message.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
