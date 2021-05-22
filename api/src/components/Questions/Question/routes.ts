import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import {
    getAllQuestions,
    getBuyerQuestions,
    getSellerQuestions
} from "./controller";

const router = express.Router();

router.get("/", isAuth, getAllQuestions);
router.get("/seller", isAuth, getSellerQuestions);
router.get("/buyer", isAuth, getBuyerQuestions);

export default router;
