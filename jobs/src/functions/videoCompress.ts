/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { s3 } from "./../config/S3Reader";
import { Channel, ConsumeMessage } from "amqplib";
import fs, { createWriteStream } from "fs";
import path from "path";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { getReadStream } from "../config/S3Reader";

ffmpeg.setFfmpegPath(ffmpegPath.path);

type fileData = {
  key: string;
  location: string;
};

export const minifyVideo = async (
  receivedData: fileData,
  channel: Channel,
  message: ConsumeMessage
) => {
  const data = getReadStream(receivedData.key);

  await new Promise((res) =>
    data
      .pipe(createWriteStream(path.join(__dirname, "../", receivedData.key)))
      .on("close", res)
  );

  ffmpeg(path.join(__dirname, "../", receivedData.key))
    // Generate 720P video
    .output(path.join(__dirname, "../processed/", receivedData.key))
    .videoCodec("libx264")
    .noAudio()
    .size("1280x720")
    .on("error", function (err) {
      console.log(err);
      console.log("An error occurred: " + err.message);
    })
    .on("progress", function (progress) {
      console.log("... frames: " + progress.frames);
    })
    .on("end", async function () {
      console.log("Finished processing");
      const data = fs.readFileSync(
        path.join(__dirname, "../processed/", receivedData.key)
      );
      await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME! as string,
          Key: receivedData.key,
          Body: data,
        })
        .promise();

      fs.unlinkSync(path.join(__dirname, "../", receivedData.key));
      fs.unlinkSync(path.join(__dirname, "../processed/", receivedData.key));
      channel.ack(message);
    })
    .run();
};
