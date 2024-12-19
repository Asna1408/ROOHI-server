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
exports.UserForgetPassController = void 0;
class UserForgetPassController {
    constructor(iuserforgetpasswordusecase) {
        this.iuserforgetpasswordusecase = iuserforgetpasswordusecase;
    }
    RequestResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, link } = req.body;
                const emailExists = yield this.iuserforgetpasswordusecase.SendVerificationEmail(email, link);
                if (!emailExists) {
                    res.status(400).json({ message: 'Email not found' });
                    return;
                }
                res.status(200).json({ message: 'Password reset link sent to your email.' });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.iuserforgetpasswordusecase.RequestPasswordReset(email, password);
                if (result) {
                    res.status(200).json({ message: 'Password reset successful' });
                }
                else {
                    res.status(400).json({ message: 'Error resetting password' });
                }
            }
            catch (error) {
                console.error('Error resetting password:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.UserForgetPassController = UserForgetPassController;
