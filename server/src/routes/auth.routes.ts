import express from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";

const router = express.Router();
router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  createUserSessionHandler
);

router.post("/api/sessions/refresh", getUserSessionsHandler);

export default router;
