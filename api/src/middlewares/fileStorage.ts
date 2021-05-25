import * as dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

export const ImageUpload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname + "/../uploads/images"));
    },
    filename: function (_req, _file, cb) {
      cb(null, Date.now() + ".jpg");
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export const VideoUpload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname + "/../uploads/video"));
    },
    filename: function (_req, _file, cb) {
      cb(null, Date.now().toString() + ".mp4");
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});
