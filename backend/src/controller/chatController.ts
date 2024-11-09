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