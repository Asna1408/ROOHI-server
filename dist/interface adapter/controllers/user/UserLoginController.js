"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginController = void 0;
class UserLoginController {
    constructor(iuserloginusecase, igetbannerinUseusecaseInterface) {
        this.iuserloginusecase = iuserloginusecase;
        this.igetbannerinUseusecaseInterface = igetbannerinUseusecaseInterface;
    }
    UserLoginControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.iuserloginusecase.UserLogin(req.body.email, req.body.password);
                const token = req.body.token;
                const refreshToken = req.body.refreshToken;
                res.cookie('access_token', token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
                res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
                res.json(data);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
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
    getHomePageBanners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.igetbannerinUseusecaseInterface.fetchActiveBanners();
                res.status(200).json(banners);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch banners', error });
            }
        });
    }
}
exports.UserLoginController = UserLoginController;
