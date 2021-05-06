import express from "express";
import { Login, Register } from "./controller";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

export default router;
