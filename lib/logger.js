import winston from "winston";

let Logger = winston.Logger;
let { Console, File } = winston.transports;

export default new Logger({
  level: "info",
  transports: [
    new Console(),
    new File({ filename: "application.log" })
  ]
});