import { GetBannerInUserUsecaseIInterface } from "../../../entities/useCaseInterfaces/user/GetBannerInUserUsecaseIInterface";
import { IUserLoginUseCase } from "../../../entities/useCaseInterfaces/user/IUserLoginUseCase";
import { Request, Response } from "express";
import { Req, Res } from "../../../frameworks/Types/servertype";
    
export class UserLoginController {
        constructor(private iuserloginusecase: IUserLoginUseCase,
            private igetbannerinUseusecaseInterface : GetBannerInUserUsecaseIInterface
        ) {}
    
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

        async getHomePageBanners(req:Req, res:Res) {
            try {
              const banners = await this.igetbannerinUseusecaseInterface.fetchActiveBanners();
              res.status(200).json(banners);
            } catch (error) {
              res.status(500).json({ message: 'Failed to fetch banners', error });
            }
          }

    }
    