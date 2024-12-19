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
exports.UserResendOtpUseCase = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = require("../../frameworks/services/nodemailer/nodemailer");
class UserResendOtpUseCase {
    constructor(iuserrepository) {
        this.iuserrepository = iuserrepository;
    }
    ResendOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.iuserrepository.FindByEmail(email);
                // If user does not exist or is already verified, return appropriate message
                if (!user) {
                    console.error(`User not found for email: ${email}`);
                    return "User not found";
                }
                if (user.verified) {
                    console.log(`User already verified for email: ${email}`);
                    return "User already verified";
                }
                // Generate a new OTP
                const newOtp = otp_generator_1.default.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                    digits: true,
                });
                // Update the user with the new OTP
                const updatedUser = yield this.iuserrepository.UpdateUserOtp(user.email, newOtp);
                if (!updatedUser) {
                    console.error(`Error updating OTP for user: ${email}`);
                    return "Error updating OTP for user";
                }
                // Send the new OTP via email
                const sendEmail = yield (0, nodemailer_1.SendEmailOtp)(user.name, user.email, newOtp);
                if (sendEmail) {
                    console.log(`OTP resent successfully to: ${email}`);
                    return "OTP resent successfully";
                }
                else {
                    console.error(`Error sending OTP email to: ${email}`);
                    return "Error sending OTP email";
                }
            }
            catch (error) {
                console.error("An error occurred while resending OTP:", error);
                return "An unknown error occurred";
            }
        });
    }
}
exports.UserResendOtpUseCase = UserResendOtpUseCase;
