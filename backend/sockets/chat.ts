import { Server, Socket } from "socket.io";
import http from "http";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("message", (socket: Socket) => {
  console.log("A user connected:", socket.id);
});
