/* eslint-disable @typescript-eslint/no-explicit-any */

import amqp, { Channel } from "amqplib";

const ImageId = "Image";
const VideoId = "Video";

let ImageChannel: Channel | null = null;
let VideoChannel: Channel | null = null;

export const CreateMessageConn = async () => {
  const conn = await amqp.connect({
    username: "ferin",
    password: "patel",
  });

  ImageChannel = await conn.createChannel();
  ImageChannel.assertQueue(ImageId);

  VideoChannel = await conn.createChannel();
  VideoChannel.assertQueue(VideoId);
};

export const publishToQueueImage = async (data: any) => {
  if (ImageChannel) {
    ImageChannel.sendToQueue(ImageId, Buffer.from(JSON.stringify(data)));
    console.log("Message Send To Queue");
  } else {
    console.log("Image Channel Not Found");
  }
};

export const publishToQueueVideo = async (data: any) => {
  if (ImageChannel) {
    ImageChannel.sendToQueue(VideoId, Buffer.from(JSON.stringify(data)));
  } else {
    console.log("Video Channel Not Found");
  }
};
