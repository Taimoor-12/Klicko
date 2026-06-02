import express from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import requireAuth from "../requireAuth.js";
import makeStatsController from "../controllers/user/StatsController.js";
import makeLinksController from "../controllers/user/LinksController.js";

const router = express.Router();

const stats = makeStatsController();
const links = makeLinksController();

router.get(
  "/stats",
  authMiddleware,
  requireAuth(stats.statsController),
);

router.get(
  "/links",
  authMiddleware,
  requireAuth(links.linksController),
)

export default router;
