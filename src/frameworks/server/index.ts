import express, { Application, Request, Response, NextFunction } from "express";
import { createServer, Server as HTTPServer } from 'http';
import UserRoute from '../route/user/UserRoute';
import AdminRoute from '../route/admin/AdminRoute';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { initializeSocket } from "../services/WebSocket/socket";
import { Server as SocketIoServer } from 'socket.io';


export class ExpressServer {
    private app: Application;
  
  
    private server: HTTPServer;
    private io: SocketIoServer;


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
        // Log all incoming requests to the console
        
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



