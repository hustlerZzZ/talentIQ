<<<<<<< HEAD
import { Server } from 'socket.io';
import {server} from '../app';


export async function chatController () {
    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log("a user connected");
    });

    io.on("message", (socket) => {
        console.log('hello');
        
      socket.on("chat message", (msg: string) => {
        console.log("message: " + msg);
      });
    });

}
=======
import { Server, Socket } from "socket.io";
import http from "node:http";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("message", (socket: Socket) => {
  console.log("A user connected:", socket.id);
  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
>>>>>>> dc61a8a3e26b5b5379eff8fa539fbdb72c37f36d
