import express from "express";
import { ImageUpload } from "./../../middlewares/fileStorage";
import {
    uploadMultipleImgs,
    uploadMultipleVids,
    uploadSingleImg,
    uploadSingleVid
} from "./controller";

const router = express.Router();

router.post("/image/single", ImageUpload.single("image"), uploadSingleImg);
router.post("/image/multiple", ImageUpload.array("images"), uploadMultipleImgs);

router.post("/video/single", ImageUpload.single("video"), uploadSingleVid);
router.post("/video/multiple", ImageUpload.array("vidoes"), uploadMultipleVids);

export default router;
