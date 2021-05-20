import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { createPropertyItem, getAllPropertyItems } from "./controller";

const router = express.Router();

router.get("/", getAllPropertyItems);
router.post("/", isAuth, createPropertyItem);

export default router;
