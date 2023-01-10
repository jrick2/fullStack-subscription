import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import cors from "cors";
require("express-async-errors");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
