import winston from "winston";

export const Delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

const formatLog = (log: winston.Logform.TransformableInfo) => {
  if (log.module) {
    return `${log.label} [${log.level}]: ${log.message}`;
  }
};

export const mainLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.label({ label: "[Stables]" }),
        winston.format.colorize({ all: true }),
        winston.format.printf(formatLog)
      ),
    }),
  ],
});
