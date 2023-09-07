import express from "express";
import authRoutes from "./authRoute.js";
import conversationRoutes from "./conversationRoute.js";
import messageRoutes from "./messageRoute.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);

export default router;
