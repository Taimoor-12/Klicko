import express from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import requireAuth from "../requireAuth.js";
import makeStatsController from "../controllers/user/StatsController.js";

const router = express.Router();

const stats = makeStatsController();

router.get(
  "/stats",
  authMiddleware,
  requireAuth(stats.statsController),
);

export default router;
