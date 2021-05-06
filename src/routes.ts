import express from "express";
import RoleRouter from "./components/Role/routes";

const router = express.Router();

router.use("/role", RoleRouter);

export default router;
