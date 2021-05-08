import { spawn } from "child_process";
import { createConnection } from "typeorm";
import { seedCountry } from "./../components/Country/seed";
import { seedRole } from "./../components/Role/seed";
import { seedState } from "./../components/State/seed";
import { seedUser } from "./../components/User/seed";
import { logger } from "./../configs/Logger";

const dropTables = async () => {
  const ls = spawn("npx", ["typeorm", "schema:drop"]);

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });

  ls.on("exit", (code) => {
    console.log(`child process exited with code ${code}`);
    runMigration();
  });
};
const runMigration = () => {
  createConnection()
    .then(async () => {
      await seedCountry();
      await seedState();
      await seedRole();
      await seedUser();
    })
    .catch((error: Error) => {
      logger.error(error);
    });
};

dropTables();
