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
exports.GoogleOAthController = void 0;
class GoogleOAthController {
    constructor(googleauthusecase) {
        this.googleauthusecase = googleauthusecase;
    }
    GoogleoauthController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.googleauthusecase.GoogleAuthLogin(req.body);
                if (data) {
                    const token = req.body.token;
                    const refreshToken = req.body.refreshToken;
                    // Set both access token and refresh token as cookies
                    res.cookie('access_token', token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); // 1 hour
                    res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
                    res.json(data);
                }
                else {
                    res.status(401).json({ message: "Invalid credentials." });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Authentication failed." });
            }
        });
    }
}
exports.GoogleOAthController = GoogleOAthController;
