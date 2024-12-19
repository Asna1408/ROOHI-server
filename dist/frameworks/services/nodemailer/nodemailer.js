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
exports.sendResetPasswordEmail = exports.SendEmailOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendEmailOtp = (name, email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sendVerifyMail = (name, email, otp) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const https = require('https');
                const agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                const transporter = nodemailer_1.default.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'asnatm01@gmail.com',
                        pass: 'degc jalb wnoo tqkq'
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                    // Custom agent might not be needed if you're not working around a specific certificate issue
                    // agent,
                });
                const mailOptions = {
                    from: 'asnatm01@gmail.com',
                    to: email,
                    subject: 'Email Verification',
                    html: `${otp.length > 6 ? `<a href=${otp}>Click the link to reset password</a>` : `<p>Hi ${name}, your OTP for signing up is: ${otp}</p>`}`,
                };
                // Send email using the transporter
                yield transporter.sendMail(mailOptions);
                console.log('Email has been sent');
                return true;
            }
            catch (error) {
                console.error('Error sending email:', error.message);
                return false;
            }
        });
        const sendMailResult = yield sendVerifyMail(name, email, otp);
        if (sendMailResult) {
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
    catch (error) {
        console.error('Error generating or sending OTP:', error.message);
        return { success: false };
    }
});
exports.SendEmailOtp = SendEmailOtp;
//no use delete it
const sendResetPasswordEmail = (email, link) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: "asnatm01@gmail.com",
            pass: "degc jalb wnoo tqkq",
        },
    });
    const mailOptions = {
        from: "asnatm01@gmail.com",
        to: email,
        subject: 'Password Reset Request',
        text: 'Click the following link to reset your password: <URL>',
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
