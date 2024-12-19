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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserForgetPassUseCase = void 0;
const nodemailer_1 = require("../../frameworks/services/nodemailer/nodemailer");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserForgetPassUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    ;
    RequestPasswordReset(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedpassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield this.iuserrepository.UpdatePassword(email, hashedpassword);
                return user;
            }
            catch (error) {
                console.error('Error resetting password : ', error);
                return false;
            }
        });
    }
    SendVerificationEmail(email, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.iuserrepository.FindByEmail(email);
                if (!user) {
                    return false;
                }
                const emailSend = yield (0, nodemailer_1.SendEmailOtp)(user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, link);
                if (emailSend.success) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new Error("Error occured while sending mail");
            }
        });
    }
}
exports.UserForgetPassUseCase = UserForgetPassUseCase;
