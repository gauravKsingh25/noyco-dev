import express from "express";
const router = express.Router();

import {updateName, updateEmail, updatePassword } from "../controllers/userProfile"

router.post("/update-email", updateEmail);
router.post("/update-name", updateName);
router.post("/update-password", updatePassword);