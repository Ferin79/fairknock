import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { createProperty, getAllProperty, getPropertyById } from "./controller";

const router = express.Router();

router.get("/", isAuth, getAllProperty);
router.get("/:id", isAuth, getPropertyById);
router.post("/", isAuth, createProperty);

export default router;
