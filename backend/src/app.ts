import express from "express";
import helmet from "helmet";
import cors from "cors";

import { StatusCodes } from "./enums/statusCodes";

const app = express();
const PORT = process.env.PORT || 6969;

// Allowing cors
app.use(cors());

// Parsing JSON
app.use(express.json());

// Adding security headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Routes

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
