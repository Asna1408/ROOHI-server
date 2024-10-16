import express, { Application, Request, Response, NextFunction } from "express";
import UserRoute from '../route/user/UserRoute';
import AdminRoute from '../route/admin/AdminRoute';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


export class ExpressServer {
    private app: Application;
  
   

    constructor() {
        this.app = express();
        
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
        this.app.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }
}

// To initialize the server, create an instance of ExpressServer
// new ExpressServer();



