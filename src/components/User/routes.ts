import express from "express";
import { getAllUser } from "./controller";

const router = express.Router();

router.get("/", getAllUser);
router.post("/");

export default router;
