import { getAllRole } from "./controller";
import express from "express";

const router = express.Router();

router.get("/", getAllRole);

export default router;
