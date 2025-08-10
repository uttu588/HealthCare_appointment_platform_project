// meetRoute.js
import express from "express";
import { createMeet } from "../controllers/meetController.js";
const router = express.Router();

// POST /api/meet - create a Google Meet link
router.post("/", createMeet);

export default router;
