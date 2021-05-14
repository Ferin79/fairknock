import { minifyImages } from "./functions/imageCompress";
import amqp from "amqplib";
import { minifyVideo } from "./functions/videoCompress";

const ImageId = "Image";
const VideoId = "Video";

let MAX_RETRY = 10;

const main = async () => {
  try {
    let conn = null;
    while (MAX_RETRY > 0) {
      try {
        conn = await amqp.connect({
          hostname: "rabbitmq",
          port: 5672,
          username: "ferin",
          password: "patel",
        });
        console.log(conn);
        break;
      } catch (error) {
        console.log(error);
        MAX_RETRY--;
        console.log("Retrying....");
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
    if (conn) {
      const ImageChannel = await conn.createChannel();
      await ImageChannel.assertQueue(ImageId);

      const VideoChannel = await conn.createChannel();
      await VideoChannel.assertQueue(VideoId);

      ImageChannel.consume(ImageId, async (message) => {
        if (message?.content) {
          const data = JSON.parse(message?.content.toString());
          await minifyImages(data);
          ImageChannel.ack(message);
          console.log("Minified Image");
        }
      });

      VideoChannel.consume(VideoId, async (message) => {
        if (message?.content) {
          const data = JSON.parse(message?.content.toString());
          await minifyVideo(data, VideoChannel, message);
          console.log("Minified Video");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

main();
