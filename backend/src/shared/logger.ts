import pino from "pino";
import { config } from "../config/index.js";

const logger = pino({
  level: config.app.nodeEnv === "prod" ? "info" : "debug",
  ...(config.app.nodeEnv !== "prod" && { 
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid, hostname"
      }
    } 
  })
});

export default logger;
