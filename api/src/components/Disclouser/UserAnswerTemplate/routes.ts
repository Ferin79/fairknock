import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { createUserAnswer } from "./controller";

const router = express.Router();

router.post("/", isAuth, createUserAnswer);

export default router;
