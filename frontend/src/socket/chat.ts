import { io, Socket } from "socket.io-client";

const socketUrl = "http://localhost:6969";
export const socket: Socket = io(socketUrl);
``