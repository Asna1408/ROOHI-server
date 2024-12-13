import express, { Application, Request, Response, NextFunction } from "express";
import { createServer, Server as HTTPServer } from 'http';
import UserRoute from '../route/user/UserRoute';
import AdminRoute from '../route/admin/AdminRoute';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { initializeSocket } from "../services/WebSocket/socket";
import { Server as SocketIoServer } from 'socket.io';
import logger from "../../entities/utils/logger";
import morgan from "morgan";


export class ExpressServer {
    private app: Application;
    private server: HTTPServer;
    private io: SocketIoServer;
    private morganFormat: string = ":method :url :status :response-time ms";

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = initializeSocket(this.server);
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
        this.startServer();
    }



    private configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(
            morgan(this.morganFormat, {
              stream: {
                write: (message) => {
                  const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                  };
                  logger.info(JSON.stringify(logObject));
                },
              },
            })
          );
        
    }
    

    private configureRoutes(): void {
        console.log('Setting up routes...');
        this.app.use('/user', UserRoute);
        this.app.use('/admin',AdminRoute);
        
        this.app.use('*', (req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        });
    }

    private configureErrorHandling(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            const statusCode: number = err.statusCode || 500;
            const message = err.message || "Internal server error";
            res.status(statusCode).json({
                success: false,
                statusCode,
                message,
            });
        });
    }

    private startServer(): void {
        const port = process.env.PORT || 7000;  
        this.server.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }
}

// To initialize the server, create an instance of ExpressServer
// new ExpressServer();



