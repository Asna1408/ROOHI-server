"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, json, colorize } = winston_1.format;
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// Custom format for console logging with colors
const consoleLogFormat = winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(({ level, message }) => {
    return `${level}: ${message}`;
}));
// Create a Winston logger
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new winston_1.transports.Console({
            format: consoleLogFormat,
        }),
        new winston_daily_rotate_file_1.default({
            filename: 'loggerDetails/app.log', // Directory for log files, logs folder should exist
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '1d', // Keep logs for 1 day
            format: json(),
        }),
    ],
});
exports.default = logger;
