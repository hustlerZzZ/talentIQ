import { io, Socket } from "socket.io-client";

const socketUrl = "http://localhost:6969/api/v1/chats";
export const socket: Socket = io(socketUrl);
