import express from "express";
import faiToolController from "../controllers/faiToolController.js";

import { FAiParser } from "../cloudinary.js";

const router = express.Router();

router.post("/", FAiParser.single("image"), faiToolController.createFAi);

router.get("/", faiToolController.getFAi);

export default router;
