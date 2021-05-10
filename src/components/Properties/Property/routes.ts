import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { getAllProperty, getPropertyById } from "./controller";

const router = express.Router();

router.get("/", isAuth, getAllProperty);
router.get("/:id", isAuth, getPropertyById);

export default router;
