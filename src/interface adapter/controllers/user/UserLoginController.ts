import { IUserLoginUseCase } from "../../../entities/useCaseInterfaces/user/IUserLoginUseCase";
import { Request, Response } from "express";
    
export class UserLoginController {
        constructor(private iuserloginusecase: IUserLoginUseCase) {}
    
        async UserLoginControl(req: Request, res: Response): Promise<void> {
            try {
                // Authenticate user using email and password
                const data = await this.iuserloginusecase.UserLogin(req.body.email, req.body.password);
                
                // Assuming `data.token` contains the JWT token after successful login
                const token = req.body.token;
    
                // Set the JWT token as a cookie(only when login is succesful)
                res.cookie('access_token', token, {
                    httpOnly: false,
                    maxAge: 60 * 60 * 1000 // Expires in 1 hour
                });
    
                // Send response along with user data or success message
                res.json(data);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
    