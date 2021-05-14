/* eslint-disable @typescript-eslint/no-non-null-assertion */
import S3 from "aws-sdk/clients/s3";
import * as dotenv from "dotenv";

dotenv.config();

export const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const ObjectPromise = (key: string) => {
  return s3
    .getObject({ Key: key, Bucket: process.env.AWS_BUCKET_NAME! })
    .promise();
};

export const getReadStream = (key: string) =>
  s3
    .getObject({ Key: key, Bucket: process.env.AWS_BUCKET_NAME! })
    .createReadStream();
