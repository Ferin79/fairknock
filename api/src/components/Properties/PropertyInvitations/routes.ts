import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import { acceptInvitation, removeInvitation } from "./controller";

const router = express.Router();

router.post("/", isAuth, acceptInvitation);
router.delete("/:id", isAuth, removeInvitation);

export default router;
