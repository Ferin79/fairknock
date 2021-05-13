import express from "express";
import { isAuth } from "./../../middlewares/isAuth";
import { getAllUser, getUserById, MeUser, updateUser } from "./controller";

const router = express.Router();

router.get("/", getAllUser);
router.get("/me", isAuth, MeUser);
router.get("/:id", isAuth, getUserById);
router.patch("/", isAuth, updateUser);

export default router;
