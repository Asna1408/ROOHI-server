"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const UserRoute_1 = __importDefault(require("../route/user/UserRoute"));
const AdminRoute_1 = __importDefault(require("../route/admin/AdminRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("../services/WebSocket/socket");
const logger_1 = __importDefault(require("../../entities/utils/logger"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class ExpressServer {
    constructor() {
        this.morganFormat = ":method :url :status :response-time ms";
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.io = (0, socket_1.initializeSocket)(this.server);
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
        this.startServer();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        const corsOptions = {
            origin: ["https://perfect-bride.vercel.app"],
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Authorization", "Content-Type"],
            credentials: true,
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.options('*', (0, cors_1.default)(corsOptions));
        this.app.use((0, morgan_1.default)(this.morganFormat, {
            stream: {
                write: (message) => {
                    const logObject = {
                        method: message.split(" ")[0],
                        url: message.split(" ")[1],
                        status: message.split(" ")[2],
                        responseTime: message.split(" ")[3],
                    };
                    logger_1.default.info(JSON.stringify(logObject));
                },
            },
        }));
    }
    configureRoutes() {
        console.log('Setting up routes...');
        this.app.use('/user', UserRoute_1.default);
        this.app.use('/admin', AdminRoute_1.default);
        this.app.use('*', (req, res) => {
            res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        });
    }
    configureErrorHandling() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            const message = err.message || "Internal server error";
            res.status(statusCode).json({
                success: false,
                statusCode,
                message,
            });
        });
    }
    startServer() {
        const port = process.env.PORT || 7000;
        this.server.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }
}
exports.ExpressServer = ExpressServer;
// To initialize the server, create an instance of ExpressServer
// new ExpressServer();
