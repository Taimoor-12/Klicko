import express from "express";
import makeLongUrlToShortUrlController from "../controllers/LongUrlToShortUrlController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import requireAuth from "../requireAuth.js";
import validateBody from "../middlewares/ValidateBody.js";

const router = express.Router();

const longUrlToShortUrlController = makeLongUrlToShortUrlController();

router.post('/shorten', authMiddleware, validateBody(["longUrl"]), requireAuth(longUrlToShortUrlController.convertLongUrlToShort));

export default router;
