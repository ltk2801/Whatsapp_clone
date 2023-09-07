import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  create_open_conversation,
  getConversations,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/", trimRequest.all, authMiddleware, create_open_conversation);
router.get("/", trimRequest.all, authMiddleware, getConversations);

export default router;
