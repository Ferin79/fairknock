import { minifyImages } from "./functions/imageCompress";
import amqp from "amqplib";

const ImageId = "Image";
const VideoId = "Video";

const main = async () => {
  try {
    const conn = await amqp.connect({
      username: "ferin",
      password: "patel",
    });
    const ImageChannel = await conn.createChannel();
    await ImageChannel.assertQueue(ImageId);

    const VideoChannel = await conn.createChannel();
    await VideoChannel.assertQueue(VideoId);

    ImageChannel.consume(ImageId, async (message) => {
      if (message?.content) {
        const data = JSON.parse(message?.content.toString());
        minifyImages(data);
        ImageChannel.ack(message);
        console.log("Minified Image");
      }
    });

    VideoChannel.consume(VideoId, async (message) => {
      if (message?.content) {
        const data = JSON.parse(message?.content.toString());
        console.log(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

main();
