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
exports.AdminLoginController = void 0;
class AdminLoginController {
    constructor(iadminloginusecase) {
        this.iadminloginusecase = iadminloginusecase;
    }
    AdminLoginControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.token;
                const refreshToken = req.body.refreshToken;
                // Set both access token and refresh token as cookies
                res.cookie("access_token", token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
                res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
                const data = yield this.iadminloginusecase.AdminLogin(req.body.email, req.body.password);
                res.json(data);
            }
            catch (error) {
                res.status(404).json(error);
                console.log(error);
            }
        });
    }
}
exports.AdminLoginController = AdminLoginController;
