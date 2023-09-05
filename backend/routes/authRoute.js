import express from "express";
import trimRequest from "trim-request";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", trimRequest.all, register);
router.post("/login", trimRequest.all, login);
router.post("/logout", trimRequest.all, logout);
router.post("/refreshtoken", trimRequest.all, refreshToken);
router.get(
  "/testingauthMiddleware",
  trimRequest.all,
  authMiddleware,
  (req, res) => {
    res.send(req.user);
  }
);

export default router;
