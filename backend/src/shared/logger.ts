import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "prod" ? "info" : "debug",
  ...(process.env.NODE_ENV !== "prod" && { 
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