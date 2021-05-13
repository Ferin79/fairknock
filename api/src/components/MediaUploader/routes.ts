import express from "express";
import { ImageUpload, VideoUpload } from "./../../middlewares/fileStorage";
import {
    uploadMultipleImgs,
    uploadMultipleVids,
    uploadSingleImg,
    uploadSingleVid
} from "./controller";

const router = express.Router();

router.post("/image/single", ImageUpload.single("image"), uploadSingleImg);
router.post("/image/multiple", ImageUpload.array("images"), uploadMultipleImgs);

router.post("/video/single", VideoUpload.single("video"), uploadSingleVid);
router.post("/video/multiple", VideoUpload.array("vidoes"), uploadMultipleVids);

export default router;
