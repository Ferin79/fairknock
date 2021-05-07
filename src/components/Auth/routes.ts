import express from "express";
import { Confirm, Login, Register } from "./controller";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/confirm/:token", Confirm);

export default router;
