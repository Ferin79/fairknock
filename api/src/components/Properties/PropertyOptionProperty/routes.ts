import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import {
    createPropertyOptionConn,
    deletePropertyOptionConn
} from "./controller";

const router = express.Router();

router.post("/", isAuth, createPropertyOptionConn);
router.post("/delete", isAuth, deletePropertyOptionConn);

export default router;
