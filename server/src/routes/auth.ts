import express from "express";
const router = express.Router();

router.get("/register", async (req, res) => res.send("Hello"));
router.post("/login", async (req, res) => res.send("Hello 2"));

export default router;
