import express from "express";
import { upload } from "./../../middlewares/fileStorage";
import { uploadMultipleImgs, uploadSingleImg } from "./controller";

const router = express.Router();

router.post("/single", upload.single("image"), uploadSingleImg);
router.post("/multiple", upload.array("images"), uploadMultipleImgs);

export default router;
