import express from "express";
import { handleVideoSocket } from "../controller/videoController";

const router = express.Router();

router.get("/connect", handleVideoSocket);

export default router;
