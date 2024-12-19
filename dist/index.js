"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("./frameworks/database/mongodb/dbConnect");
const server_1 = require("./frameworks/server");
(0, dbConnect_1.connectDb)();
const server = new server_1.ExpressServer();
