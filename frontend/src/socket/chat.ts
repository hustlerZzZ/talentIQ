import { io, Socket } from "socket.io-client";

const socketUrl = "http://localhost:6969"; // Remove the /api/v1/chat/connect path
export const socket: Socket = io(socketUrl, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

// Add connection event listeners
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});
