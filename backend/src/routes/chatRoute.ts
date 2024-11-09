import express from "express";
import { chatController } from "../controller/chatController";

const router = express.Router();

router.post('/chats', chatController);

export default router;