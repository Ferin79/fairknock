import express from "express";
import { getStatesFromCountryId } from "./controller";

const router = express.Router();

router.get("/:id", getStatesFromCountryId);

export default router;
