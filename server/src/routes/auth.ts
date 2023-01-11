import express from "express";
import { createUserHandler } from "../controllers/auth";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../userSchema/schema";

const router = express.Router();

router.post("/register", validateResource(createUserSchema), createUserHandler);

export default router;
