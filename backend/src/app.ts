import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { setupSocket } from "./controller/chatController";
import videoConfRoute from "./routes/videoConfRoute";
import { StatusCodes } from "./enums/statusCodes";

const app = express();
export const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Setup Socket handlers
setupSocket(io);

const PORT = process.env.PORT || 6969;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Routes
app.use("/api/v1/video", videoConfRoute);
// ... other routes

app.use("*", function (req, res) {
  res.status(StatusCodes.FAILED).json({
    status: "failed",
    msg: "This route is not defined",
  });
});

server.listen(PORT, function () {
  console.log(`Server running on PORT : ${PORT}`);
});
