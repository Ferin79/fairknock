import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import {
  createProperty,
  getInvitedProperty,
  getMyProperty,
  getPropertyById,
  updatePropertyStatus,
} from "./controller";

const router = express.Router();

router.get("/my", isAuth, getMyProperty);
router.get("/invited", isAuth, getInvitedProperty);
router.get("/:id", isAuth, getPropertyById);
router.post("/", isAuth, createProperty);
router.patch("/status", isAuth, updatePropertyStatus);

export default router;
