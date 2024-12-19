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
exports.UserRegisterUseCase = void 0;
const nodemailer_1 = require("../../frameworks/services/nodemailer/nodemailer");
const otp_generator_1 = __importDefault(require("otp-generator"));
class UserRegisterUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    UserRegister(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.iuserrepository.FindByEmail(user.email);
                const OTP = otp_generator_1.default.generate(6, {
                    upperCaseAlphabets: true,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                    digits: false,
                });
                // If user exists and is verified, return error message
                if (existingUser) {
                    if (existingUser.verified) {
                        return "User already exists";
                    }
                    else {
                        // If user is not verified, delete the existing user
                        const isDeleted = yield this.iuserrepository.FindByEmailAndDelete(existingUser.email);
                        if (!isDeleted) {
                            return "Error deleting existing unverified user";
                        }
                    }
                }
                // Register the new user or re-register the unverified one
                const userData = Object.assign({ otp: OTP }, user);
                console.log(userData);
                const savedData = yield this.iuserrepository.RegisterUser(userData);
                if (savedData) {
                    const sendEmail = yield (0, nodemailer_1.SendEmailOtp)(user.name, user.email, OTP);
                    if (sendEmail) {
                        console.log("Email sent successfully");
                        return savedData;
                    }
                    else {
                        return "Error sending OTP email";
                    }
                }
                else {
                    return "Error saving data to the database";
                }
            }
            catch (error) {
                console.error("An error occurred during registration:", error);
                return "An error occurred";
            }
        });
    }
}
exports.UserRegisterUseCase = UserRegisterUseCase;
