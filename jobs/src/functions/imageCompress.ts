/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectPromise, s3 } from "./../config/S3Reader";
import imagemin from "imagemin";
import imageminJpeg from "imagemin-jpegtran";

type fileData = {
  key: string;
  location: string;
};

export const minifyImages = async (receivedData: fileData) => {
  const data = await ObjectPromise(receivedData.key);

  if (data.Body) {
    const compressedBuffer = await imagemin.buffer(data.Body as Buffer, {
      plugins: [imageminJpeg()],
    });

    await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME! as string,
        Key: receivedData.key,
        Body: compressedBuffer,
      })
      .promise();
  }
};
