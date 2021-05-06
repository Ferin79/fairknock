import express, { NextFunction, Request, Response } from "express";
import RoleRouter from "../components/Role/routes";
import UserRouter from "../components/User/routes";
import { NotFound } from "../errors/NotFound";

const router = express.Router();

router.use("/role", RoleRouter);
router.use("/user", UserRouter);

router.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound(`API Not Found with URL : ${req.originalUrl}`));
});

export default router;
