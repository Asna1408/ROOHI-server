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
exports.ResendOtpController = void 0;
class ResendOtpController {
    constructor(iuserResendOtpUseCase) {
        this.iuserResendOtpUseCase = iuserResendOtpUseCase;
    }
    // Controller method for handling resend OTP requests
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            console.log("Email received in request:", email);
            if (!email) {
                return res.status(400).json({ success: false, message: "Email is required." });
            }
            try {
                // Call the use case to handle the resend OTP logic
                const result = yield this.iuserResendOtpUseCase.ResendOtp(email);
                console.log(result);
                // Check the result and return the appropriate response
                if (result === "User not found") {
                    return res.status(404).json({ success: false, message: "User not found." });
                }
                if (result === "User already verified") {
                    return res.status(400).json({ success: false, message: "User already verified." });
                }
                if (result === "OTP resent successfully") {
                    return res.status(200).json({ success: true, message: "OTP resent successfully." });
                }
                else {
                    return res.status(500).json({ success: false, message: result });
                }
            }
            catch (error) {
                console.error("Error in resend OTP controller:", error);
                return res.status(500).json({ success: false, message: "An error occurred while resending OTP." });
            }
        });
    }
}
exports.ResendOtpController = ResendOtpController;
