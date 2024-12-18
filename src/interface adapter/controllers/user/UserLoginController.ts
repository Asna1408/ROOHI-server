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
                const data = await this.iuserloginusecase.UserLogin(req.body.email, req.body.password);
                
                const token = req.body.token;
                const refreshToken = req.body.refreshToken;
        
                res.cookie('access_token', token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
                res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
        
                res.json(data);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
        }

      //   async UserLoginControl(req: Request, res: Response): Promise<void> {
      //     try {
      //         const data = await this.iuserloginusecase.UserLogin(req.body.email, req.body.password);
      
      //         // Continue with token generation and cookies as before
      //         const token = req.body.token;
      //         const refreshToken = req.body.refreshToken;
      
      //         res.cookie('access_token', token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
      //         res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
      
      //         res.json(data);
      //     } catch (error) {
      //         if (error instanceof Error) {
      //             if (error.message === "Your account is blocked. Please contact support.") {
      //                 res.status(403).json({ message: error.message });
      //             } else {
      //                 console.error(error);
      //                 res.status(500).json({ message: "Internal server error" });
      //             }
      //         } else {
      //             console.error("An unknown error occurred:", error);
      //             res.status(500).json({ message: "Internal server error" });
      //         }
      //     }
      // }
      
      

        async getHomePageBanners(req:Req, res:Res) {
            try {
              const banners = await this.igetbannerinUseusecaseInterface.fetchActiveBanners();
              res.status(200).json(banners);
            } catch (error) {
              res.status(500).json({ message: 'Failed to fetch banners', error });
            }
        }

    }
    