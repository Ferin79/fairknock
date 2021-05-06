import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import { pagination } from "typeorm-pagination";
import { logger } from "./configs/Logger";
import { handleErrors } from "./middlewares/handleErrors";
import routes from "./service/routes";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(pagination);
app.use(routes);
app.use(handleErrors);

createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server 🚀 Started On PORT ${PORT}`);
    });
  })
  .catch((error: Error) => {
    logger.error(error);
  });
