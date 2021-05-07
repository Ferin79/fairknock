import express, { NextFunction, Request, Response } from "express";
import AuthRouter from "../components/Auth/routes";
import RoleRouter from "../components/Role/routes";
import UserRouter from "../components/User/routes";
import { NotFound } from "../errors/NotFound";

const router = express.Router();

router.use("/role", RoleRouter);
router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

router.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound("API", req.originalUrl));
});

export default router;
