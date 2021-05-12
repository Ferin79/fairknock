import S3 from "aws-sdk/clients/s3";
import * as dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME as string,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, __file, cb) {
      cb(null, Date.now().toString() + ".jpg");
    },
  }),
});
