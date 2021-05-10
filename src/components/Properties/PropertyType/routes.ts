import express from "express";
import { isAdmin } from "../../../middlewares/isAdmin";
import { isAuth } from "../../../middlewares/isAuth";
import { createPropertyType, getAllPropertyType } from "./controller";

const router = express.Router();

router.get("/", getAllPropertyType);
router.post("/", isAuth, isAdmin, createPropertyType);

export default router;
