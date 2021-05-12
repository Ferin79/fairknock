import express from "express";
import { upload } from "./../../middlewares/fileStorage";
import { uploadSingleImg } from "./controller";

const router = express.Router();

router.post("/single", upload.single("image"), uploadSingleImg);

export default router;
