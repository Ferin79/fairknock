/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getReadStream, s3 } from "./../config/S3Reader";
import imagemin from "imagemin";
import imageminJpeg from "imagemin-mozjpeg";

type fileData = {
  key: string;
  location: string;
};

export const minifyImages = async (receivedData: fileData) => {
  const data = await getReadStream(receivedData.key);

  if (data.Body) {
    const compressedBuffer = await imagemin.buffer(data.Body as Buffer, {
      plugins: [imageminJpeg({ quality: 50 })],
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
