import express from "express";
import { isAuth } from "./../../../middlewares/isAuth";
import {
    createOffer,
    getAllOfferByMe,
    getAllOfferByPropertyId
} from "./controller";

const router = express.Router();

router.get("/me", isAuth, getAllOfferByMe);
router.get("/property/:id", isAuth, getAllOfferByPropertyId);

router.post("/", isAuth, createOffer);

export default router;
