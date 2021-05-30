import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { createUserAnswer, deleteUserAnswer } from "./controller";

const router = express.Router();

router.post("/", isAuth, createUserAnswer);
router.delete("/:id", isAuth, deleteUserAnswer);

export default router;
