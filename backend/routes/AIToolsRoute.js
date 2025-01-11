import express from "express";
const router = express.Router();
import {
  getAITools,
  uploadAIToolsData,
  deleteItemsInRange,
} from "../controllers/AIToolsControllers.js";

router.get("/get-ai-tools", getAITools);
router.post("/upload-ai-tools", uploadAIToolsData);
router.delete("/del", deleteItemsInRange);

export default router;
