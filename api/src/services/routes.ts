import express, { NextFunction, Request, Response } from "express";
import AuthRouter from "../components/Auth/routes";
import MediaUploaderRouter from "../components/MediaUploader/routes";
import PropertyRouter from "../components/Properties/Property/routes";
import PropertyItemRouter from "../components/Properties/PropertyAddItems/routes";
import PropertyInvitationRouter from "../components/Properties/PropertyInvitations/routes";
import PropertyMediaRouter from "../components/Properties/PropertyMedia/routes";
import PropertyOptionRouter from "../components/Properties/PropertyOption/routes";
import PropertyOptionConnectionRouter from "../components/Properties/PropertyOptionProperty/routes";
import PropertyTypeRouter from "../components/Properties/PropertyType/routes";
import QuestionRouter from "../components/Questions/Question/routes";
import QuestionTypeRouter from "../components/Questions/QuestionType/routes";
import RoleRouter from "../components/Role/routes";
import StateRouter from "../components/State/routes";
import UserRouter from "../components/User/routes";
import { NotFound } from "../errors/NotFound";
import { ToPdf } from "./../utils/toPdf";

const router = express.Router();

router.use("/role", RoleRouter);
router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/state", StateRouter);
router.use("/propertyType", PropertyTypeRouter);
router.use("/propertyOption", PropertyOptionRouter);
router.use("/propertyOptionConnection", PropertyOptionConnectionRouter);
router.use("/propertyMedia", PropertyMediaRouter);
router.use("/propertyItems", PropertyItemRouter);
router.use("/property", PropertyRouter);
router.use("/media", MediaUploaderRouter);
router.use("/questionType", QuestionTypeRouter);
router.use("/question", QuestionRouter);
router.use("/propertyInvitation", PropertyInvitationRouter);
router.get("/test-pdf", ToPdf);

router.get("/healthCheck", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

router.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound("API", req.originalUrl));
});

export default router;
