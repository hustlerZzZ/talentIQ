import { Server, Socket } from "socket.io";

interface RoomUser {
  socketId: string;
  userId: string;
  roomId: string;
  role: "interviewer" | "interviewee";
}

interface ChatMessage {
  userId: string;
  message: string;
  timestamp: number;
  role: "interviewer" | "interviewee";
}

const rooms = new Map<string, Set<RoomUser>>();

export const setupVideoSocket = (io: Server) => {
  const videoIO = io.of("/video"); // Create a namespace for video

  videoIO.on("connection", (socket: Socket) => {
    console.log(`Video Socket Connected`, socket.id);

    // Handle joining a room
    socket.on("join-room", ({ roomId, userId, role }) => {
      console.log(`Join room request:`, { roomId, userId, role });

      // Check if room exists and has capacity
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      const room = rooms.get(roomId)!;

      // Check if room is full (2 users max)
      if (room.size >= 2) {
        socket.emit("room-full", { message: "Room is full" });
        return;
      }

      // Check if role is already taken
      const roleExists = Array.from(room).some((user) => user.role === role);
      if (roleExists) {
        socket.emit("role-taken", {
          message: `Role '${role}' is already taken`,
        });
        return;
      }

      const user: RoomUser = { socketId: socket.id, userId, roomId, role };
      room.add(user);
      socket.join(roomId);

      console.log(`User joined room:`, user);
      console.log(`Current room size:`, room.size);

      // Notify others in the room
      socket.to(roomId).emit("user-joined", {
        userId,
        socketId: socket.id,
        role,
      });

      // Send existing users to the new participant
      const existingUsers = Array.from(room)
        .filter((u) => u.socketId !== socket.id)
        .map((u) => ({
          userId: u.userId,
          socketId: u.socketId,
          role: u.role,
        }));

      socket.emit("existing-users", existingUsers);

      // If room has 2 users, emit room-ready event
      if (room.size === 2) {
        videoIO.to(roomId).emit("room-ready", {
          users: Array.from(room).map((u) => ({
            userId: u.userId,
            socketId: u.socketId,
            role: u.role,
          })),
        });
      }
    });

    // Handle WebRTC signaling
    socket.on("offer", ({ offer, to }) => {
      console.log(`Sending offer to:`, to);
      socket.to(to).emit("offer", { offer, from: socket.id });
    });

    socket.on("answer", ({ answer, to }) => {
      console.log(`Sending answer to:`, to);
      socket.to(to).emit("answer", { answer, from: socket.id });
    });

    socket.on("ice-candidate", ({ candidate, to }) => {
      socket.to(to).emit("ice-candidate", { candidate, from: socket.id });
    });

    // Handle chat messages
    socket.on("send-message", ({ roomId, message, userId, role }) => {
      const chatMessage: ChatMessage = {
        userId,
        message,
        timestamp: Date.now(),
        role,
      };
      videoIO.to(roomId).emit("new-message", chatMessage);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      rooms.forEach((users, roomId) => {
        const user = Array.from(users).find((u) => u.socketId === socket.id);
        if (user) {
          users.delete(user);
          socket.to(roomId).emit("user-left", {
            userId: user.userId,
            socketId: socket.id,
            role: user.role,
          });

          if (users.size === 0) {
            rooms.delete(roomId);
          }

          console.log(`User left room:`, user);
          console.log(`Current room size:`, users.size);
        }
      });
      console.log(`Socket disconnected:`, socket.id);
    });
  });
};
