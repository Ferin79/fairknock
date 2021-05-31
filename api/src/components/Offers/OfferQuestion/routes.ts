import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { getAllQuestions } from "./controller";

const router = express.Router();

router.get("/", isAuth, getAllQuestions);

export default router;
