import express from "express";
import {
    ImageUpload,
    PDFUpload,
    VideoUpload
} from "./../../middlewares/fileStorage";
import { isAuth } from "./../../middlewares/isAuth";
import {
    uploadMultipleImgs,
    uploadMultipleVids,
    uploadSingleImg,
    uploadSinglePdf,
    uploadSingleVid
} from "./controller";

const router = express.Router();

router.post(
  "/image/single",
  isAuth,
  ImageUpload.single("image"),
  uploadSingleImg
);
router.post(
  "/image/multiple",
  isAuth,
  ImageUpload.array("images"),
  uploadMultipleImgs
);

router.post(
  "/video/single",
  isAuth,
  VideoUpload.single("video"),
  uploadSingleVid
);
router.post(
  "/video/multiple",
  isAuth,
  VideoUpload.array("vidoes"),
  uploadMultipleVids
);

router.post("/pdf/single", isAuth, PDFUpload.array("pdf"), uploadSinglePdf);

export default router;
