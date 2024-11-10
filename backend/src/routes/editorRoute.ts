import express from "express";
import { editorController } from "../controller/editor";

const router = express.Router();
router.post('/save-code', editorController)

export default router;