import express from "express";
import { getAllQuestionType } from "./controller";

const router = express.Router();

router.get("/", getAllQuestionType);

export default router;
