import React, { useState, useEffect, useCallback } from "react";
import { socket } from "../socket/chat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { MessageProps } from "../utils/interfaces/message";

const generateRandomUsername = () => {
  const names = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];
  const surnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller"];
  const getRandomElement = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const name = getRandomElement(names);
  const surname = getRandomElement(surnames);
  const randomNum = Math.floor(Math.random() * 1000);
  return `${name.toLowerCase()}${surname.toLowerCase()}${randomNum}`;
};

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [username] = useState(generateRandomUsername());
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Connection status handlers
    const onConnect = () => {
      console.log("Connected to server");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    };

    // Message handler
    const onMessage = (message: MessageProps) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      if (!isConnected) {
        console.error("Not connected to server");
        return;
      }

      const newMessage: MessageProps = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sender: username,
        content,
        timestamp: new Date().toISOString(),
      };

      socket.emit("message", newMessage);
    },
    [username, isConnected],
  );

  return (
    <div className="flex flex-col h-full rounded-xl border-2 border-black relative">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} senderId={username} />
      </div>
      <div className="p-4 border-t border-zinc-500">
        <MessageInput onSend={sendMessage} disabled={!isConnected} />
      </div>
      {!isConnected && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          Disconnected from server. Attempting to reconnect...
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
