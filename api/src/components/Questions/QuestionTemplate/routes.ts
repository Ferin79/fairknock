import express from "express";
import { isAuth } from "../../../middlewares/isAuth";
import { getQuestionTemplateById, getSpecificQuestions } from "./controller";

const router = express.Router();

router.get("/specific", isAuth, getSpecificQuestions);
router.get("/:id", isAuth, getQuestionTemplateById);

export default router;
