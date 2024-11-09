import express from "express";
import helmet from "helmet";
import cors from "cors";

import { StatusCodes } from "./enums/statusCodes";
import quizRoute from "./routes/quizRoute";
import chatRoute from "./routes/chatRoute";
import pdfRoute from "./routes/pdfRoute";
import videoConfRoute from "./routes/videoConfRoute";
import scheduleMeetRoute from "./routes/scheduleMeetRoute";
import editorRoute from "./routes/editorRoute";

const app = express();
const PORT = process.env.PORT || 6969;

// Allowing cors
app.use(cors());

// Parsing JSON
app.use(express.json());

// Adding security headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Routes
// 1. Upload pdf
app.use("/api/v1/pdf", pdfRoute)

// 2. quiz modal data
app.use("/api/v1/quiz", quizRoute)

// 3. chat
app.use("/api/v1/chat", chatRoute)

// 4. video conferencing
app.use("/api/v1/video", videoConfRoute)

// 5. scheduling meeting
app.use("/api/v1/schedule", scheduleMeetRoute)

// 6. editor meeting
app.use("/api/v1/editor", editorRoute)

// Global catch handler
app.use("*", function (req, res) {
    res.status(StatusCodes.FAILED).json({
        status: "failed",
        msg: "This route is not defined",
    });
});

// Server
app.listen(PORT, function () {
    console.log(`Server running on PORT : ${PORT}`);
});
