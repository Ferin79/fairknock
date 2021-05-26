import express from "express";
import { Confirm, Login, Register, resendConfirmation } from "./controller";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/confirm/:token", Confirm);
router.post("/resend", resendConfirmation);

export default router;
