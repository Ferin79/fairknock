import * as dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

export const ImageUpload = multer({
  storage: multer.diskStorage({
    destination: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "image") {
        cb(null, path.join(__dirname + "/../uploads/images"));
      } else {
        cb(Error(`invalid file ${file.mimetype}`), "");
      }
    },
    filename: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "image") {
        cb(null, Date.now().toString() + ".jpg");
      }
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export const VideoUpload = multer({
  storage: multer.diskStorage({
    destination: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "video") {
        cb(null, path.join(__dirname + "/../uploads/video"));
      } else {
        cb(Error(`invalid file ${file.mimetype}`), "");
      }
    },
    filename: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "video") {
        cb(null, Date.now().toString() + ".mp4");
      }
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});
