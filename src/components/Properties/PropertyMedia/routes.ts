import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { createPropertyMedia, deletePropertyMedia } from "./controller";

const router = express.Router();

router.post("/", isAuth, createPropertyMedia);
router.post("/delete", isAuth, deletePropertyMedia);

export default router;
