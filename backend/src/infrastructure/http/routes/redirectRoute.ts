import express from "express";
import makeShortUrlToLongUrlController from "../controllers/ShortUrlToLongUrlController.js";

const router = express.Router();

const shortUrlToLongUrlController = makeShortUrlToLongUrlController();

router.get('/:shortCode', shortUrlToLongUrlController.redirectToLongUrl);

export default router;
