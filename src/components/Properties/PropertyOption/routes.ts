import express from "express";
import { getAllPropertyOption } from "./controller";

const router = express.Router();

router.get("/", getAllPropertyOption);

export default router;
