import multerS3 from "multer-s3";
import * as dotenv from "dotenv";
import multer from "multer";
import S3 from "aws-sdk/clients/s3";

dotenv.config();

console.log(process.env.AWS_REGION);

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const ImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME as string,
    metadata: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "image") {
        cb(null, { fieldName: file.fieldname });
      } else {
        cb(Error(`invalid file ${file.mimetype}`));
      }
    },

    key: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "image") {
        cb(null, "images/" + Date.now().toString() + ".jpg");
      }
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export const VideoUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME as string,
    metadata: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "video") {
        cb(null, { fieldName: file.fieldname });
      } else {
        cb(Error(`invalid file ${file.mimetype}`));
      }
    },

    key: function (_req, file, cb) {
      if (file.mimetype.split("/")[0] === "video") {
        cb(null, "video/" + Date.now().toString() + ".mp4");
      }
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
});
