import { Request, Response } from "express";
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

export const handleVideoSocket = (req: Request, res: Response) => {
    const io = new Server(6969, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        path: "/api/v1/video/connect",
    });

    io.on("connection", (socket: Socket) => {
        console.log(`Socket Connected`, socket.id);

        // Handle joining a room
        socket.on("join-room", ({ roomId, userId, role }) => {
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
            const roleExists = Array.from(room).some(
                (user) => user.role === role
            );
            if (roleExists) {
                socket.emit("role-taken", {
                    message: `Role '${role}' is already taken`,
                });
                return;
            }

            const user: RoomUser = {
                socketId: socket.id,
                userId,
                roomId,
                role,
            };

            // Add user to room
            room.add(user);

            // Join the Socket.IO room
            socket.join(roomId);
            console.log(`Socket ${socket.id} joined room ${roomId} as ${role}`);

            // Notify others in the room
            socket
                .to(roomId)
                .emit("user-joined", { userId, socketId: socket.id, role });

            // Send existing users to the new participant
            const existingUsers = Array.from(room)
                .filter((u) => u.socketId !== socket.id)
                .map((u) => ({
                    userId: u.userId,
                    socketId: u.socketId,
                    role: u.role,
                }));

            socket.emit("existing-users", existingUsers);

            // If room is now full (2 users), emit room-ready event
            if (room.size >= 2) {
                socket.emit("room-full", { message: "Room is full" });
                return;
            }
        });

        // Handle WebRTC signaling
        socket.on("offer", ({ offer, to }) => {
            socket.to(to).emit("offer", {
                offer,
                from: socket.id,
            });
        });

        socket.on("answer", ({ answer, to }) => {
            socket.to(to).emit("answer", {
                answer,
                from: socket.id,
            });
        });

        socket.on("ice-candidate", ({ candidate, to }) => {
            socket.to(to).emit("ice-candidate", {
                candidate,
                from: socket.id,
            });
        });

        // Handle chat messages
        socket.on("send-message", ({ roomId, message, userId, role }) => {
            const chatMessage: ChatMessage = {
                userId,
                message,
                timestamp: Date.now(),
                role,
            };

            io.to(roomId).emit("new-message", chatMessage);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            // Find and remove user from all rooms
            rooms.forEach((users, roomId) => {
                const user = Array.from(users).find(
                    (u) => u.socketId === socket.id
                );
                if (user) {
                    users.delete(user);
                    // Notify others in the room
                    socket.to(roomId).emit("user-left", {
                        userId: user.userId,
                        socketId: socket.id,
                        role: user.role,
                    });

                    // If room is empty, remove it
                    if (users.size === 0) {
                        rooms.delete(roomId);
                    }
                }
            });

            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    res.send("Socket.IO connection established for video conferencing");
};
