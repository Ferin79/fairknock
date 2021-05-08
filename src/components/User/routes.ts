import express from "express";
import { isAuth } from "./../../middlewares/isAuth";
import { getAllUser, getUserById, MeUser } from "./controller";

const router = express.Router();

router.get("/", getAllUser);
router.get("/me", isAuth, MeUser);
router.get("/:id", isAuth, getUserById);
router.post("/");

export default router;
