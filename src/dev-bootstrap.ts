import "dotenv/config";
import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import("./index.js");

const jobsDir = path.join(__dirname, "infrastructure/background-jobs");
fs.readdirSync(jobsDir).forEach((jobFolder) => {
  const folderPath = path.join(jobsDir, jobFolder);

  const workerPath = path.join(folderPath, "worker.js");
  if (fs.existsSync(workerPath)) import(String(pathToFileURL(workerPath)));

  const producerPath = path.join(folderPath, "producer.js");
  if (fs.existsSync(producerPath)) import(String(pathToFileURL(producerPath)));
});
