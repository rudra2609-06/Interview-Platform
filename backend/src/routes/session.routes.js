import express from "express";
import { protectRoutes } from "../middlewares/protectRoutes.middleware.js";
import {
  createSession,
  getActiveSessions,
  getPastSessions,
  getSessionById,
  joinSession,
  endSession,
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", protectRoutes, createSession);
router.get("/", protectRoutes, getActiveSessions);
router.get("/my-recent", protectRoutes, getPastSessions);
router.get("/:id", protectRoutes, getSessionById);
router.post("/:id/join", protectRoutes, joinSession);
router.post("/:id/end", protectRoutes, endSession);

export default router;
