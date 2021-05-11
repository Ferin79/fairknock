import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { createPropertyMedia } from "./controller";

const router = express.Router();

router.post("/", isAuth, createPropertyMedia);

export default router;
