import express from "express";
import { createUserAnswer } from "./controller";

const router = express.Router();

router.post("/", createUserAnswer);

export default router;
